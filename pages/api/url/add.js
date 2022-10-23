import { NextApiRequest, NextApiResponse } from 'next'

import { uid } from 'uid/secure';
import multiparty from "multiparty";
import db from '../../../lib/database';

const metascraper = require('metascraper')([
  require('metascraper-date')(),
  require('metascraper-image')(),
  require('metascraper-logo')(),
  require('metascraper-logo-favicon')(),
  require('metascraper-title')(),
  require('metascraper-amazon')(),
  require('@samirrayani/metascraper-price')(),
  require('../../../lib/price')(),
])



class Page {

  constructor(url) {
    this.url = url;
    this.id = uid(32);
  }
  async scrape(html) {
    Object.assign(this, await metascraper({ html, url: this.url }));
    if (!this.images) {
      this.images = [];
    }
    if (this.image) {
      this.images.push(this.image);
    }
  }
  async save(user) {
    if (this.image || this.title || this.price)
      db(user).push(`/${this.id}`, this);
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.redirect(302, req.url.replace('api/url/add','list')).end()
  }
  const form = new multiparty.Form({maxFieldsSize:'20MB'});
  const {fields, files} = await new Promise((resolve, reject) => {
    form.parse(req, function (err, fields, files) {
      if (err) reject({ err });
      resolve({fields, files});
    });
  });
  const handler =  new Page(fields.url[0]);
  handler.images = fields.images;
  await handler.scrape(fields.html[0]);
  res.status(200).json(handler);
  handler.save(req.query.id);
}
