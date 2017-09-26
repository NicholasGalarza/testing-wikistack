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

  describe('Instance methods', function () {
    let page1, page2, page3;
    beforeEach(function(done){
       page1 = Page.create({
        title: 'base',
        content: 'content',
        tags: ['cats', 'dogs', 'goldfish']
      });

       page2 = Page.create({
        title: 'page2',
        content: 'content',
        tags: ['potatoes', 'celery', 'onions']
      });

       page3 = Page.create({
        title: 'page3',
        content: 'content',
        tags: ['foo', 'dogs', 'foo']
      });

      Promise.all([page1, page2, page3])
      .then(function(pages){
        page1 = pages[0];
        page2 = pages[1];
        page3 = pages[2];
        done();
      }).catch(done);
    })

    describe('findSimilar', function () {
      it('never gets itself', (done) => {

        page1.findSimilar().
          then(function(pages){
            pages.should.not.include(page);
            done();

        }).catch(done);

      });

      it('gets other pages with any common tags', function(done){

          page1.findSimilar().
          then(function(pages){
            expect(pages[0].title).to.equal('page3');
            done();
          })
          .catch(done);

      });

      it('does not get other pages without any common tags');
    });

    afterEach(function(done){
      Page.sync({force: true})
      .then(() => {
        done();
      }).catch(done);

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
