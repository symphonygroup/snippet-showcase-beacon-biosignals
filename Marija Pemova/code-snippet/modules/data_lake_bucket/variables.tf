variable "data_lake_bucket_name" {
  description = "Bucket where the python scripts are stored and the raw and stage folders are located."
  type        = string
  default     = "bucket_name"
}

variable "py_script_deals_transform" {
  description = "Python script name for deals transformation."
  type        = string
  default     = "deals_transform.py"
} 