# mylittleproxy
### This is an example of an Apigee proxy with some basic policies in place also (response caching, spike arrest, JSON &amp; XML threat protection).

![image courtesy of https://fontmeme.com](https://fontmeme.com/permalink/181124/38a933f4f7d84a2b0f60329df49c11b5.png)
(image courtesy of https://fontmeme.com)


![Screenshot of this proxy from Apigee UI (for evaluation account)](https://raw.githubusercontent.com/kristianjaeger/mylittleproxy/f5d6f8e01e46c70a385514b6cde09637824b5f39/proxyFromApigeeUi.png)        

Here's an example of the weather data response from the Apigee proxy, but originally from YQL.
![Weather data JSON response](https://raw.githubusercontent.com/kristianjaeger/mylittleproxy/master/jsonResponse.png)

For full instructions on how to get the nodejs facade and proxy into Apigee please see - https://github.com/apigee/apigee-partner-se-bootcamp/tree/master/labs/API%20Services%20Lesson%206%20-%20Create%20a%20Node.js%20Proxy (This repo was obviously influenced heavily by that).

For more about Apigee policies please see - https://docs.apigee.com/api-platform/reference/policies/reference-overview-policy . Cheers.

### Prerequisites:
* apigeetool NPM module downloaded and installed globally as an admin user. 'sudo npm install -g apigeetool'
* nodejs installed - https://nodejs.org/en/download/ . I used v8.12.0.
* install the nodejs modules that you need by 'npm init', 'npm install' (more details in the bootcamp link above)

### Running the nodejs facade:
* To run locally - 'node weather.js' and test via browser or curl 'curl -i http://localhost:7000/forecast?zipcode=98101'

### To deploy to Apigee:
* Make sure you have an account (evaluation should work fine) - https://apigee.com
* 'apigeetool deploynodeapp -n {your-initials}_weather -d . -m weather.js -o YOUR-ORG -e test -b /{your-initials}/v1/weather'

### Use your proxy:
* Sign into your Apigee account
* Go to proxies and choose your proxy
* The URL should be similar to http://YourAccount-eval-test.apigee.net/ab/v1/weather
* Test again like above but with your proxy URL

P.S. I'm still learning Apigee so please let me know if something could be improved (within the context of this simple example).  Cheers.
