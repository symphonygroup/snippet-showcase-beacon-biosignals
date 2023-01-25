terraform {
  required_version = ">=0.13"
}

##################################################################
### Uploading the python script to the bucket
##################################################################
resource "aws_s3_object" "dl_script_deals_transform" {
 bucket      = var.data_lake_bucket_name
 key         = "s3://${var.bucket_name}/scripts/${var.py_script_deals_transform}"
 source      = "./code-snippet/scripts/${var.py_script_deals_transform}"
 source_hash = filemd5("./code-snippet/scripts/${var.py_script_deals_transform}")