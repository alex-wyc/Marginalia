#!/usr/bin/env python
# _*_ coding: utf-8 _*_

#################################################################################
# Parse HTML for the project, handles the BeautifulSoup and HTML that is passed #
# and connects it to the database                                               #
#                                                                               #
# Authors                                                                       #
#  Jeffrey Zou                                                                  #
#                                                                               #
# Description                                                                   #
#  Handles the formatting of the HTML                                           #
#                                                                               #
#################################################################################

import sqlite3
from bs4 import BeautifulSoup
from bs4 import UnicodeDammit
from database import *
from HTMLParser import HTMLParser

def pretty():
    '''
    Returns a pretty version of the HTML

    Args:
        htmlPage (string): the HTML that will be prettified

    Returns:
        Unicode of prettified HTML
    '''

    htmlPage = '''
    <html>
    <body>
    <p>sacr&#233; bleu &#582;</p>
    </body>
    </html>
    '''
    parser = HTMLParser()

    #Make sure it's in a single encoding
    htmlPage = UnicodeDammit.detwingle(htmlPage)
    #htmlPage should be a unicode string right now
    soup = BeautifulSoup(htmlPage, 'html.parser')
    prettyString = soup.prettify(formatter='html')
    texts = soup.get_text()
    #return soup.prettify()

def updateDatabase(email, htmlPage, site_id, comments, notes):
    '''
    Updates the database with the page or adds it if it does not exist

    Args:
        htmlPage (string): the HTML of the page
        email (string): user's email
        site_id (integer): id of the site, -1 if it does not exist

    Returns:
        True
    '''

    page = pretty(htmlPage)
    if site_id == -1:
        add_to_sites(email, page, comments, notes)
    else:
        update_site(email, site_id, page, comments, notes)
    return True
