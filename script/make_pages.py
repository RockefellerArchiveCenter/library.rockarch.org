#!/usr/bin/python

import json
import sys
from os import listdir, mkdir, pardir
from os.path import abspath, basename, isdir, join

OBJ_PREFIX = "items"
DATA_DIR = abspath(join(__file__, pardir, pardir, "_data", "marc"))
PAGE_DIR = abspath(join(__file__, pardir, pardir, OBJ_PREFIX))


def clean_string(string):
    """Removes unwanted characters from a string."""
    replaced = string.strip().replace("\n", "").replace('"', '\\"')
    return replaced.encode("utf-8")

def dict_value_from_list(list, key):
    """Given a key, returns the value for that key in a list of dictionaries."""
    val = next((d for d in list if d.get(key)), {}).get(key, "")
    return val.encode("utf-8")

def construct_title(field_data):
    """Constructs a display title."""
    title_data = dict_value_from_list(field_data, "245")
    title = dict_value_from_list(title_data['subfields'], 'a').encode('utf-8').rstrip(' /')
    subtitle = dict_value_from_list(title_data['subfields'], 'b').encode('utf-8').rstrip(' /')
    return "{} {}".format(title, subtitle) if subtitle else title

def make_pages():
    """Creates Markdown pages for each JSON file found in DATA_DIR.

    Data from the file to create a YAML header in the file.
    """
    if not isdir(PAGE_DIR):
        mkdir(PAGE_DIR)
    for f in listdir(DATA_DIR):
        with open(join(DATA_DIR, f), "r") as df:
            data = json.load(df)
            title = construct_title(data["fields"])
            obj_id = dict_value_from_list(data["fields"], "001").rstrip("\\")
        with open(join(PAGE_DIR, "{}.md".format(obj_id)), "w") as page:
            page.write("---\nlayout: item\n")
            page.write("title: \"{}\" \n".format(clean_string(title)))
            page.write("id: {}\n".format(obj_id))
            page.write("permalink: {}/{}/\n".format(OBJ_PREFIX, obj_id))
            page.write("---")


if __name__ == "__main__":
    make_pages()
