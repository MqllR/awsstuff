#!/usr/bin/env python3

# -*- encoding: utf-8 -*-

from simplejson import dumps

def return_result(body={}, status_code=200):
    "Return a lambda proxy formatted response"

    return {
        'isBase64Encoded': False,
        'statusCode': status_code,
        'body': dumps(body),
        'headers': {
            'Content-Type': 'application/json',
        }
    }
