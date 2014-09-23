REPORTER = dot

test:
	@NODE_ENV=development ./node_modules/.bin/mocha \
		--reporter $(REPORTER) 


test-w:
	@NODE_ENV=development ./node_modules/.bin/mocha \
	       --reporter $(REPORTER) \
	       --growl \
	       --watch

.PHONY: test test-w
