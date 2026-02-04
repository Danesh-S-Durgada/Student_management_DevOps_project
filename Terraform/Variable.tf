variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "ap-south-1"
}

variable "instance_type_value" {
  description = "EC2 instance type (Free Tier)"
  type        = string
  default     = "t2.micro"
}

variable "bucketname" {
  description = "Unique S3 bucket name"
  type        = string
}

variable "key_name" {
  description = "EC2 Key Pair name"
  type        = string
}

variable "my_ip" {
  description = "Your public IP for SSH access"
  type        = string
}
