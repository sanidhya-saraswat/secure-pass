if(process.env.NODE_ENV=='production')
{
    module.exports={mongoURI:'mongodb://sam:123passSecure@ds113454.mlab.com:13454/securepassdb'}
}
else
{
    module.exports={mongoURI:'mongodb://sam:123passSecure@ds113454.mlab.com:13454/securepassdbdev'}
}