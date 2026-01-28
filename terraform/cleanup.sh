#!/bin/bash
set -e

# Configuration (must match main.tf)
KEY_NAME="tourGuide-app-key"
SG_NAME="tourGuide-security-group"
REGION="${AWS_REGION:-us-east-1}"

echo "Cleaning up conflicting AWS resources in $REGION..."

# 1. Delete Key Pair
echo "Deleting Key Pair: $KEY_NAME"
# suppressing error if key doesn't exist
aws ec2 delete-key-pair --key-name "$KEY_NAME" --region "$REGION" || true

# 2. Terminate Instances using the Security Group
# We need to find instances first because dependent instances prevent SG deletion.
echo "Finding instances attached to Security Group: $SG_NAME"
INSTANCE_IDS=$(aws ec2 describe-instances \
    --region "$REGION" \
    --filters "Name=instance.group-name,Values=$SG_NAME" \
    --query "Reservations[].Instances[].State.Name" \
    --output text | grep -v "terminated" || true)

if [ -n "$INSTANCE_IDS" ]; then
     # Get IDs only for non-terminated instances
    ACTUAL_IDS=$(aws ec2 describe-instances \
        --region "$REGION" \
        --filters "Name=instance.group-name,Values=$SG_NAME" "Name=instance-state-name,Values=pending,running,stopping,stopped" \
        --query "Reservations[].Instances[].InstanceId" \
        --output text)
        
    if [ -n "$ACTUAL_IDS" ]; then
        echo "Terminating instances: $ACTUAL_IDS"
        aws ec2 terminate-instances --instance-ids $ACTUAL_IDS --region "$REGION"
        
        echo "Waiting for instances to terminate..."
        aws ec2 wait instance-terminated --instance-ids $ACTUAL_IDS --region "$REGION"
    fi
else
    echo "No active instances found for this security group."
fi

# 3. Delete Security Group
echo "Deleting Security Group: $SG_NAME"
aws ec2 delete-security-group --group-name "$SG_NAME" --region "$REGION" || true

echo "Cleanup complete."
