#!/usr/bin/env python
import sys
import requests
import os
calais_url = 'https://api.thomsonreuters.com/permid/calais'
with open('./calais-cred', 'r') as cred:
    credential = cred.read().replace('\n', '')

input_data = 'Lockheed Martin Corp., Grand Prairie, Texas, was awarded a $91,567,663 modification (P00013) to contract W31P4Q-17-D-0026 for Phased Array Tracking on Radar to Intercept Advanced Capability-3 Missile Support Center for the U.S. logistics support missile repair and logistics support recertification. Work locations and funding will be determined with each order, with an estimated completion date of June 8, 2019. U.S. Army Contracting Command, Redstone Arsenal, Alabama, is the contracting activity.'


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