if(process.env.NODE_ENV=='production')
{
    module.exports={mongoURI:'mongodb://sam:123passSecure@ds163610.mlab.com:63610/securepassdb'}
}
else
{
    module.exports={mongoURI:'mongodb://localhost/securePassdb'}
}