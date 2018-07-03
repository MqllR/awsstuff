#!/usr/bin/env python3

# -*- encoding: utf-8 -*-

def check_structure(data, struct):
    "Compare 2 dict structure"

    if isinstance(data, dict) and isinstance(struct, dict):
        return all(k in struct and check_structure(data[k], struct[k]) for k in data)
    else:
        return isinstance(data, struct)
