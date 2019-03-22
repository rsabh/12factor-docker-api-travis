const test = require('tape')
const request = require('supertest')
const express = require('express')

const Document = require('../models/Musician')
const app = require('../index')
let documentId

before(done => {
  app.on( 'APP_STARTED', () => {
    done()
  })
})

describe('API Integration Test', () => {
  it('Runs all tests', done => {
    test('/musicians/new', assert => {
      request(app)
        .post('/musicians/new')
        .send(new Document('test name', 'test band', 'test instrument'))
        .expect(200)
        .end((err, res) => {
          if (err) return assert.fail(JSON.stringify(res))
          assert.pass('Created a new record successfully, test passed!')
          assert.end()
        })
    })

    test('/musicians/all', assert => {
      request(app)
        .get('/musicians/all')
        .expect(200)
        .end((err, res) => {
          if (err) return assert.fail(JSON.stringify(res))
          documentId = res.body[0]._id
          assert.pass('Got all records successfully, test passed!')
          assert.end()
        })
    })

    test('/musicians/:id', assert => {
      request(app)
        .get(`/musicians/${documentId}`)
        .expect(200)
        .end((err, res) => {
          if (err) return assert.fail(JSON.stringify(res))
          assert.pass('Got a specific record successfully, test passed!')
          assert.end()
        })
    })

    test('/musicians/edit/:id', assert => {
      request(app)
        .patch(`/api/documents/edit/${documentId}`)
        .send(new Document('test name edit', 'test band edit', 'test instrument edit'))
        .expect(200)
        .end((err, res) => {
          if (err) return assert.fail(JSON.stringify(res))
          assert.pass('Edited a record successfully, test passed!')
          assert.end()
        })
    })

    test('/musicians/delete/:id', assert => {
      request(app)
        .delete(`/musicians/delete/${documentId}`)
        .expect(200)
        .end((err, res) => {
          if (err) return assert.fail(JSON.stringify(res))
          assert.pass('Deleted a specific record successfully, test passed!')
          assert.end()
          done()
        })
    })
  })
})