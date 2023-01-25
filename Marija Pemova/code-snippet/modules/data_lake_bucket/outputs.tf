output "dl_script_deals_transform" {
  value = var.py_script_deals_transform
  description = "Name of the python script for deals transformation."
} 

output "bucket_name" {
  value = var.data_lake_bucket_name
  description = "Name of the bucket in the data lake"
} 