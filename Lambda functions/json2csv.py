import json
import urllib.parse
import boto3
import csv
import os.path
import os

print('Loading function')

s3 = boto3.client('s3')
s3_client = boto3.resource('s3')

def lambda_handler(event, context):
    if os.path.exists('/tmp/clients.csv'):
        os.remove('/tmp/clients.csv')
    print("Received event: " + json.dumps(event, indent=2))
    data = json.dumps(event, indent=2)
    if(data is None):
        print("null data")
    else:
        print(json.loads(data))
        data2 = json.loads(data)
        print(data2[0]['name'])



    # Get the object from the event and show its content type
    # bucket = event['Records'][0]['s3']['bucket']['name']
    # key = urllib.parse.unquote_plus(event['Records'][0]['s3']['object']['key'], encoding='utf-8')
    # print(key)
    # print("Bucket: " + bucket)
    key2 = s3.list_objects_v2(Bucket='your_bucket')
    count = key2['KeyCount']
    print(key2['KeyCount'])
    response_list=[]



    # -----------------json to csv-----------------
    for obj in range(count):
        key3 = key2['Contents'][obj]['Key']
        print(key3)
        s3_client.Bucket('your_bucket').download_file(key3, '/tmp/clients.json')

        response = s3.get_object(Bucket='your_bucket', Key=key3)
        print("Data: "+response['Body'].read().decode('utf-8'))

        with open('/tmp/clients.json')as f:
            file = json.load(f)
            response_list.append(file)
        # print(file)
        file_exists = os.path.isfile('/tmp/clients.csv')
        with open('/tmp/clients.csv', 'a') as outfile:
            fieldnames = file['customer'].keys()
            print(type(fieldnames))
            writer = csv.DictWriter(outfile, fieldnames=fieldnames)
            if not file_exists:
                writer.writeheader()
            for w in file.values():
                writer.writerow(w)
                print ("w:" + str(w))


    with open('/tmp/clients.csv') as c:
        reader = csv.reader(c)
        for row in reader:
            print("row" + str(row))
    s3_client.meta.client.upload_file('/tmp/clients.csv', 'your_another_bucket', data2[0]['name']+'.csv')

    try:
        print("CONTENT TYPE: " + response['ContentType'])
        return response_list
    except Exception as e:
        print(e)
        print('Error getting object {} from bucket {}. Make sure they exist and your bucket is in the same region as this function.'.format(key, bucket))
        raise e
