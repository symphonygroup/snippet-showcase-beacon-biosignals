AWS Glue Job Terraform

This project is a partial sample code for creating Glue ETL job on AWS for transforming deals data using Terraform.

- Raw data provided in Parquet files by the providers’ sync job is directly loading into the raw zone of the Data Lake built on AWS S3.
Then, the raw data from the raw zone is transformed with AWS Glue Job using SparkSQL and PySpark module, and then inserted into the stage zone of the Data Lake, and into the RDS PostgreSQL DB as well.
- Materialized views and stored procedures are prepared to be able to serve the data to the application.
- Terraform is used as IaaS tool for defining and deploying resources.
