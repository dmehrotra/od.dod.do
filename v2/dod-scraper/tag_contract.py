#!/usr/bin/env python
import sys
import requests
import os
calais_url = 'https://api.thomsonreuters.com/permid/calais'
with open('./calais-cred', 'r') as cred:
    credential = cred.read().replace('\n', '')

input_data = 'Lockheed Martin Corp., Lockheed Martin Aeronautics Co., Fort Worth, Texas, is awarded $24,076,058 for modification P00655 to a previously awarded cost-plus-fixed-fee, firm-fixed-price contract (N00019-02-C-3002).  This modification provides for the F-35 Joint Strike Fighter Verification Simulation F-35 In-A-Box (FIAB) Phase II for delivery of the FIAB software model, software license fees, and continued FIAB software model development, integration, and support.  Work will be performed in Fort Worth, Texas (90 percent); and Marietta, Georgia (10 percent), and is expected to be completed in September 2018.  Fiscal 2018 research, development, test and evaluation (Navy, Marine Corps and Air Force) funds in the amount of $20,363,600 will be obligated at time of award, none of which will expire at the end of the current fiscal year.  This effort combines purchases for the Navy ($7,500,000; 37 percent); Marine Corps ($6,883,000; 34 percent); and  Air Force ($5,980,600; 29 percent).  The Naval Air Systems Command, Patuxent River, Maryland, is the contracting activity.'


def main():
    try:
        headers = {'X-AG-Access-Token' : credential, 'Content-Type' : 'text/plain', 'outputformat' : 'application/json'}
        tagContract(input_data, headers)
    except Exception, e:
        print 'Error in connect ', e

def tagContract(input_data, headers):
    
    response = requests.post(calais_url, data=input_data, headers=headers, timeout=80)
    print ('status code: %s' % response.status_code)
    content = response.text
    print ('Results received: %s' % content)

if __name__ == "__main__":
   main()