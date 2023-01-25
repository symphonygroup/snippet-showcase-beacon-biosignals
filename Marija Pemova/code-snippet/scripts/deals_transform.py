import sys
from awsglue.transforms import *
from awsglue.utils import getResolvedOptions
from pyspark.context import SparkContext
from awsglue.context import GlueContext
from awsglue.job import Job
from awsglue import DynamicFrame
import boto3
import json


def sparkSqlQuery(glueContext, query, mapping, transformation_ctx) -> DynamicFrame:
   for alias, frame in mapping.items():
       frame.toDF().createOrReplaceTempView(alias)
   result = spark.sql(query)
   return DynamicFrame.fromDF(result, glueContext, transformation_ctx)


args = getResolvedOptions(sys.argv, ["JOB_NAME", "ENVIRONMENT", "PRODUCT", "REGION", "data_lake_bucket", "deals_path"])
sc = SparkContext()
glueContext = GlueContext(sc)
spark = glueContext.spark_session
job = Job(glueContext)
job.init(args["JOB_NAME"], args)


# PARAMETERS
ENVIRONMENT = args["ENVIRONMENT"]
PRODUCT = args["PRODUCT"]
REGION = args["REGION"]
S3_BUCKET = args["data_lake_bucket"]
DEALS_PATH = args["deals_path"]
SECRET_ARN = args["secret_arn"]


S3_BUCKET_PATH_deals_projects_countries_csv_file = f"s3://{S3_BUCKET}/iso_map/deals_projects_countries_mapping_file.csv"
S3_BUCKET_PATH_deals = f”s3://{S3_BUCKET}/raw/{DEALS_PATH}"
S3_BUCKET_TARGET_deals = f”s3://{S3_BUCKET}/stage/{DEALS_PATH}"

# Getting DB credentials from Secrets Manager
client = boto3.client("secretsmanager", region_name=f"{REGION}")

get_secret_value_response = client.get_secret_value(
       SecretId=SECRET_ARN
)

secret = get_secret_value_response['SecretString']
secret = json.loads(secret)

db_username = secret.get('username')
db_password = secret.get('password')
db_host=secret.get('host')
db_port=secret.get('port')
db_name=secret.get('dbClusterIdentifier')
db_url = "jdbc:postgresql://{0}:{1}/{2}".format(db_host,db_port,db_name)


# Script generated for node deals_projects_country_mapping
deals_projects_country_mapping_node = glueContext.create_dynamic_frame.from_options(
   format_options={
       "quoteChar": '"',
       "withHeader": True,
       "separator": ",",
   },
   connection_type="s3",
   format="csv",
   connection_options={
       "paths": [
           S3_BUCKET_PATH_deals_projects_countries_csv_file
       ],
       "recurse": True,
   },
   transformation_ctx="deals_projects_country_mapping_node",
)

# Script generated for node deals
deals_node = glueContext.create_dynamic_frame.from_options(
   format_options={},
   connection_type="s3",
   format="parquet",
   connection_options={
       "paths": [
           S3_BUCKET_PATH_deals
       ],
       "recurse": True,
   },
   transformation_ctx="deals_node",
)

# Script generated for node SQL
SqlQuery = """
select 
       deal_number
       ,deal_name
       ,deal_status
       ,last_deal_status_date
       ,target_name
       ,target_id_number
       ,target_website_address
       ,target_city
       ,target_business_description
       ,target_sector_primary_code_text_description
       ,investor_name
       ,investor_id_number
       ,investor_website_address
       ,investor_city
       ,investor_sector_primary_code_text_description
       ,group_investor_name_
       ,group_investor_id_number 
       ,group_investor_country
       ,vendor_name
       ,vendor_id_number
       ,vendor_country
       ,vendor_sector_primary_code_text_description 
       ,vendor_business_description 
       ,deal_type
       ,deal_value
       ,deal_value_type
       ,map_target.company_country as deals_target_country
       ,map_target.company_region as deals_target_region
       ,CASE
           WHEN INSTR(d.target_region_in_country, '/') = 0 THEN d.target_region_in_country
           WHEN map_target.company_country = 'China' THEN SUBSTRING(d.target_region_in_country,INSTR(d.target_region_in_country, '/')+1,LENGTH(d.target_region_in_country))
           ELSE SUBSTRING(d.target_region_in_country,1,INSTR(d.target_region_in_country, '/')-1)
       END as deals_target_state_province
       ,map_investor.company_country as deals_investor_country
       ,map_investor.company_region as deals_investor_region
       ,CASE
           WHEN INSTR(d.investor_region_in_country,'/') = 0 THEN d.investor_region_in_country
           WHEN map_investor.company_country = 'China' THEN SUBSTRING(d.investor_region_in_country,INSTR(d.investor_region_in_country,'/')+1,LENGTH(d.investor_region_in_country))
           ELSE SUBSTRING(d.investor_region_in_country,1,INSTR(d.investor_region_in_country, '/')-1)
       END as deals_investor_state_province
       ,year(last_deal_status_date) as deal_status_update_year
      
from deals d
left join deals_projects_country_mapping map_target on d.target_country = map_target.deals_projects_country
left join deals_projects_country_mapping map_investor on d.investor_country = map_investor.deals_projects_country

"""
SQL_node = sparkSqlQuery(
   glueContext,
   query=SqlQuery,
   mapping={
       "deals_projects_country_mapping": deals_projects_country_mapping_node,
       "deals": deals_node,
   },
   transformation_ctx="SQL_node",
)

# Script generated for node Deals target
Dealstarget_node = glueContext.write_dynamic_frame.from_options(
   frame=SQL_node,
   connection_type="s3",
   format="glueparquet",
   connection_options={
       "path": S3_BUCKET_TARGET_deals,
       "partitionKeys": [],
   },
   format_options={"compression": "snappy"},
   transformation_ctx="Dealstarget_node",
)


df = SQL_node.toDF()

df.write \
           .format("jdbc") \
           .option("url","{}".format(db_url)) \
           .option("dbtable", "invest.deals") \
           .option("user","{}".format(db_username)) \
           .option("password", "{}".format(db_password)) \
           .mode('append')\
           .save()


job.commit()