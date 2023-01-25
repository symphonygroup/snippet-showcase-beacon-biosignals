variable "aws_region" {

  description = "AWS region where the resources are deployed"
  type        = string
  default     = "us-east-1"
} 

variable "environment" {
  description = "Environment to which the resources are deployed."
  type        = string
  default     = "dev"
}

variable "product" {
  description = "The name of the product."
  type        = string
  default     = "product"
}
