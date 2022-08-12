# `log`

> description: 

Did you ever have phantom console.log - or more specifically you've no idea where it was happening?

I have. This tiny bit of code will help you identify where the logging is being called from. The nice thing is it works in the browser and in node.

All the code is doing is rewriting the log and warn methods and appending the location of the call at the end of the log. Note that I'm not overloading the error method because it comes with it's own stacktrace.

The location of the call is deduced using new Error, then looking at the stack property (disclaimer: this won't work in all browsers - I've only tested in Firefox, Chrome and Node).

Simple. Now I can hunt down those rogue logs and remove them from the codebase.
## Usage

```
import {enhanceLog} from '@atom-web/log';

// TODO: DEMONSTRATE API
```
