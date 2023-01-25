provider "aws" {
  region = var.aws_region
}

################################################################
# Glue Catalog Database for raw zone
################################################################
resource "aws_glue_catalog_database" "db_deals_raw" {

 name = "db_${var.environment}_${var.product}_raw_deals"

}

module "data_lake_bucket" {
  source = "./modules/data_lake_bucket"
}

################################################################
# Glue Crawler for raw zone
################################################################
resource "aws_glue_crawler" "crawler_deals_raw" {

 database_name = aws_glue_catalog_database.db_deals_raw.name
 name          = "crawler_${var.environment}_${var.product}_raw_deals"
 role          = aws_iam_role.glue_crawler_data_lake.arn

 s3_target {
   path = "s3://${module.data_lake_bucket.bucket_name}/raw/investments/deals"
 }

}

##################################################################
### Glue job to transform data from the raw zone bucket folder into the stage zone bucket folder
##################################################################
resource "aws_glue_job" "deals_transform_glue_job" {

 name     = "${var.environment}_deals_transform_glue_job"
 role_arn = aws_iam_role.glue_job_data_lake.arn

 glue_version      = "3.0"
 worker_type       = "G.2X"
 number_of_workers = 10
 connections = flatten([
   try(aws_glue_connection.rds_connection[0].name, []),
   values(aws_glue_connection.vpc_subnets)[*].name
 ]) 

 command {
   script_location = "s3://${module.data_lake_bucket.bucket_name}/scripts/${module.data_lake_bucket.dl_script_deals_transform}"
   python_version  = "3"
 }
 default_arguments = {
   "--ENVIRONMENT"       = var.environment
   "--PRODUCT"           = var.product
   "--REGION"            = var.region
   "--deals_path"        = var.deals_path
   "--data_lake_bucket"  = "${module.data_lake_bucket.bucket_name}"
 }
 depends_on = [module.data_lake_bucket]
}
