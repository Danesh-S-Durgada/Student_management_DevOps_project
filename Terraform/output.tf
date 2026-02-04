output "ec2_public_ip" {
  description = "Public IP of the EC2 instance"
  value       = aws_instance.app_server.public_ip
}

output "ec2_public_dns" {
  description = "Public DNS of the EC2 instance"
  value       = aws_instance.app_server.public_dns
}

output "s3_bucket_name" {
  description = "S3 bucket name"
  value       = aws_s3_bucket.mybucket.bucket
}

output "private_key_pem" {
  description = "Private key for SSH"
  value       = tls_private_key.example.private_key_pem
  sensitive   = true
}
