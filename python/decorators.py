#!/usr/bin/env python3

# -*- encoding: utf-8 -*-

from simplejson import loads

from awslambda.tools import check_structure
from awslambda.tools import return_result

def verify_body(struct):
    def decorator(f):
        def wrapper(*args, **kwargs):
            event, context = args
            
            if event and 'body' in event:
                if event['body'] and check_structure(loads(event['body']), struct):
                    return f(*args, **kwargs)
                else:
                    return return_result(body="Bad body structure", status_code=502)
            else:
                return return_result(body="Error, not an API Gateway request", status_code=502)
        return wrapper
    return decorator