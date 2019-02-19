export const environment = {
    server: { port: process.env.PORT || 3000},
    db: { url: 'mongodb://jetdev:jetdev1@ds123675.mlab.com:23675/jet-uploads'},
    aws: { 
        awsAcessKey: 'AKIAIDZP73SMQFOCRDPA', 
        awsAcessKeySecret: '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',
        awsDefaultRegion: 'us-east-1'
    }
}