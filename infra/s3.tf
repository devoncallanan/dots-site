resource "aws_s3_bucket_website_configuration" "static-site" {
  bucket = var.bucket_name

  index_document {
    suffix = "index.html"
  }
  error_document { 
    key = "404.html"
  }
}