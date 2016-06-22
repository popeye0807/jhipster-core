'use strict';

const expect = require('chai').expect,
    fail = expect.fail,
    parseFromFiles = require('../../../lib/reader/jdl_reader').parseFromFiles,
    JDLParser = require('../../../lib/dsl/jdl_parser'),
    JDLEntity = require('../../../lib/core/jdl_entity'),
    JDLEnum = require('../../../lib/core/jdl_enum'),
    JDLField = require('../../../lib/core/jdl_field'),
    JDLValidation = require('../../../lib/core/jdl_validation'),
    FieldTypes = require('../../../lib/core/jhipster/field_types').SQL_TYPES,
    Validations = require('../../../lib/core/jhipster/validations').VALIDATIONS;

describe('JDLParser', function () {
  describe('::parse', function () {
    describe('when passing invalid args', function () {
      describe('because there is no document', function () {
        it('fails', function () {
          try {
            JDLParser.parse(null, 'sql');
          } catch (error) {
            expect(error.name).to.eq('NullPointerException');
          }
        });
      });
      describe('because there is no database type', function () {
        it('fails', function () {
          try {
            JDLParser.parse({
              notNull: 42
            }, null);
          } catch (error) {
            expect(error.name).to.eq('NullPointerException');
          }
        });
      });
    });
    describe('when passing valid args', function () {
      describe('with no error', function () {
        it('builds a JDLObject', function () {
          var input = parseFromFiles(['./test/test_files/complex_jdl.jdl']);
          var content = JDLParser.parse(input, 'sql');
          expect(content).not.to.be.null;
          expect(content.entities.Department).to.deep.eq(new JDLEntity({
            name: 'Department',
            tableName: 'Department',
            fields: {
              departmentId: new JDLField({name: 'departmentId', type: FieldTypes.LONG, comment: null}),
              departmentName: new JDLField({
                name: 'departmentName',
                type: FieldTypes.STRING,
                comment: null,
                validations: {required: new JDLValidation({name: Validations.REQUIRED})}
              })
            }
          }));
          expect(content.entities.JobHistory).to.deep.eq(new JDLEntity({
            name: 'JobHistory',
            tableName: 'JobHistory',
            fields: {
              startDate: new JDLField({name: 'startDate', type: FieldTypes.ZONED_DATE_TIME, comment: null}),
              endDate: new JDLField({name: 'endDate', type: FieldTypes.ZONED_DATE_TIME, comment: null})
            }
          }));
          expect(content.enums.JobType).to.deep.eq(new JDLEnum({
            name: 'JobType',
            values: ['TYPE1', 'TYPE2']
          }));
        });
      });
      describe('with an invalid field type', function () {
        it('fails', function () {
          // todo
        });
      });
      describe('with an absent validation for a field type', function () {
        it('fails', function () {
          // todo
        });
      });
      describe('with an invalid validation for a field type', function () {
        it('fails', function () {
          // todo
        });
      });
      describe('with an invalid option', function () {
        it('fails', function () {
          // todo
        });
      });
    });
  });
});