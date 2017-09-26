const expect = require('chai').expect;
const {Page} = require('../models');
const marked = require('marked');
const chai = require("chai");
chai.should();
chai.use(require('chai-things'));

describe('Page model', function () {
    let page;
    beforeEach(function(){
        page = Page.build();
    });

  describe('Virtuals', function () {
    describe('route', function () {
      it('returns the url_name prepended by "/wiki/"', () => {
        page.title = 'some_title';
        expect(page.route).to.equal(`/wiki/${page.urlTitle}`);
      });
    });
    describe('renderedContent', function () {
      it('converts the markdown-formatted content into HTML' ,() => {
        page.content = 'werlkjwlekt';
        expect(page.renderedContent).to.equal(marked(page.content));
      });
    });
  });

  describe('Class methods', function () {
    describe('findByTag', function () {
      it('gets pages with the search tag', () => {
        page.title = 'PETS';
        page.content = "Having pets is great but it also sucks...";
        page.tags = ['cats', 'dogs', 'goldfish'];

        Page.findByTag('cat'); //.then();
      });
      it('does not get pages without the search tag', (done) => {
        Page.findByTag('foo')
        .then( pages => {
          expect(pages).to.have.lengthOf(0);
          console.log(pages);
          done();
          //done();
        })
        .catch(function(err) {
          console.log(err);
          done();
        });
      });
    });
  });

  xdescribe('Instance methods', function () {
    describe('findSimilar', function (done) {
      let page1 = Page.create({
        tags: ['cats', 'dogs', 'goldfish']
      });

      let page2 = Page.create({
        tags: ['potatoes', 'celery', 'onions']
      });

      let page3 = Page.create({
        tags: ['foo', 'foo', 'foo']
      });

      it('never gets itself', () => {
        page.tags = ['cats', 'dogs', 'goldfish'];
        page.findSimilar();
        done();

      });
      it('gets other pages with any common tags');
      it('does not get other pages without any common tags');
    });
  });

  describe('Validations', function () {
    it('errors without title');
    it('errors without content');
    it('errors given an invalid status');
  });

  describe('Hooks', function () {
    it('it sets urlTitle based on title before validating');
  });

});
