

export const environment = {

    server: { port: process.env.SERVER_PORT || 3000 },
    queues: {
        exclusiveProcessOCR: process.env.EXCLUSIVE_PROCESS_OCR || "EXCLUSIVE-PROCESS-OCR",
        processOCR: process.env.PROCESS_OCR || "PROCESS-OCR",
        processSignature: process.env.PROCESS_SIGNATURE || "PROCESS-SIGNATURE",
        msVolumeRetentionDate: process.env.MS_VOLUME_RETENTION_DATE || "MS-VOLUME-RETENTION-DATE",
        mscalculateTemporalityPerCompany: process.env.MS_CALCULATE_TEMPORALITY_PER_COMPANY || "MSL-CALCULATE-TEMPORALITY-PER-COMPANY",
        mslcalculateTemporalityArchives: process.env.MSL_CALCULATE_TEMPOLALITY_ARCHIVES || "MSL-CALCULATE-TEMPOLALITY-ARCHIVES",
        mscalculateItensInVolume: process.env.MS_CALCULATE_ITENS_IN_VOLUME || "MS_CALCULATE_ITENS_IN_VOLUME",
        msAddVolumesInDocumentsPerDate: process.env.ADD_VOLUMES_IN_DOCUMENTS_PER_DATE || "MS-ADD-VOLUMES-IN-DOCUMENTS-PER-DATE",
        msImportArchives: process.env.MS_IMPORT_ARCHVES || "MS-IMPORT-ARCHIVES-READ-XLSX",
        cloud_archio_bucket: process.env.ARCHIO_BUCKET ="archiobucket",
        msImportVolumes: process.env.MS_IMPORT_VOLUMES || "MS-IMPORT-VOLUMES",
        msExportFiles: process.env.MS_EXPORT_FILES || "MS_EXPORT_ARCHIVES",
        msExport: process.env.MS_EXPORT_FILES || "MS_EXPORT_FILES",
        msExportVolumes:process.env.MS_EXPORT_VOLUMES || "MS_EXPORT_VOLUMES",
        msReduceDocumentsData: process.env.MS_REDUCE_DOCUMENTS_DATA || "MS_REDUCE_DOCUMENTS_DATA",
        msReduceDepartamentsData: process.env.MS_REDUCE_DEPARTAMENTS_DATA || "MS_REDUCE_DEPARTAMENTS_DATA",
        msDeleteAttachament: process.env.MS_DELETE_ATTACHAMENT || "MS_DELETE_ATTACHAMENT",
        msGeneralAccountingArchives: process.env.MS_GENERAL_ACCOUNTING_ARCHIVES || "MS_GENERAL_ACCOUNTING_ARCHIVES",
        msGeneralAccountingVolumes: process.env.MS_GENERAL_ACCOUNTING_VOLUMES || "MS_GENERAL_ACCOUNTING_VOLUMES",
        msEmail: process.env.MS_EMAIL || "MS_EMAIL",
        sendContract: process.env.MS_CONTRACT || "MS_CONTRACT",
        readWorksheet: process.env.READ_WORKSHEET || "READ_WORKSHEET"
    },
    rabbitmql: {
        urlRabbitmq: process.env.RABBITMQ_CONNECTION_URL || "amqps://xdcjhjem:K_71cgMgEGZh-Yr0yqWQg8sUAIFRAeoh@kebnekaise.lmq.cloudamqp.com/xdcjhjem"
        // urlRabbitmq: process.env.RABBITMQ_CONNECTION_URL || "amqp://archio:archio@localhost:5672"
    },
    rabbitmqlImport: {
        // ulrLocal: process.env.RABBITMQ_IMPORT_CONNECTION_URL || "amqp://archio:archio@rabbitmq"
        ulrLocal: process.env.RABBITMQ_IMPORT_CONNECTION_URL || "amqp://archio:archio@localhost:5672"
    },
    emailservice: {
        url: process.env.EMAIL_SERVICE || "https://apidev.archio.com.br/users"
    },
    indexNames:{
        indexSearchArchiveFull:process.env.INDEX_SEARCH_ARCHIVE_FULL|| "archive_search_default",
        willdcard:process.env.WILDCARD|| "searchOneTeram",
        indexSearchVolumeFull:process.env.INDEX_SEARCH_VOLUME_FULL || "volume_search"
    },
    db: {
        url: process.env.MONGO_ACESS || "mongodb://developarchio:71gGya74zWHLEN85@cluster0-shard-00-00-rr6sx.mongodb.net:27017/earchive?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin"
        // url: process.env.MONGO_ACESS || "mongodb://prodarchio:5Cs97Ah6QaonbyGY@cluster0-shard-00-00-rr6sx.mongodb.net:27017/archioProduction?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin"
    },
    api: {
        api_upload: process.env.API_UPLOAD || "https://mupload.archio.com.br/api/posts/multidelete"
    },
    email: {
        template: process.env.EMAIL_TMPL || `Seja bem vindo ao Archio <strong>{0}</strong>!<br><br>Seu usuário para acesso é <strong>{1}</strong>, e sua senha : <strong>{2}</strong><br><br>O endereço de acesso é <strong>https://archio.com.br/login</strong><br><br><br><br><strong>Atenciosamente,</strong><br><br><img src="https://storage.googleapis.com/archiobucket/ARCHIOFILES/PNG-05.png"width="220" height="80"  />.`,
        forgot: process.env.EMAIL_TMPL || `Olá! Recebemos uma solicitação de nova senha.<br><br>Atualizamos sua senha para: <strong>{2}</strong> . Vai precisar dela para fazer seu login, mas recomendamos que altere esta senha após o acesso.<br><br><br><br><strong>Atenciosamente,</strong><br><br><img src="https://storage.googleapis.com/archiobucket/ARCHIOFILES/PNG-05.png"width="220" height="80"  />.`,
        urlapiEmail: process.env.URLAPI || 'https://apidev.archio.com.br/users'
    },
    timeExpires:{
        timeExpireQuery: 10000
        // timeExpireQuery: 10
    },
    security:
    {
        saltRounds: process.env.SALT_ROUNDS || 10,
        apiSecret: process.env.API_SECRET || '4485445487-39112589-09898',
        enableHTTPS: process.env.ENABLE_HTTPS || false,
        certificate: process.env.CERTI_FILE || './security/keys/cert.pem',
        key: process.env.CERT_KEY_FILE || './security/keys/cert.pem',
        firebase: process.env.FIREBASE || './security/keys/archionotifier-firebase-adminsdk-cpecv-146c40d8c5.json'

    },
    log: {
        level: process.env.LOG_LEVEL || 'debug',
        name: 'archio-api-logger'
    },
    smtp: {
        host: "smtp.gmail.com",
        port: 587,
        user: "suporte@archio.com.br",
        pass: "Ar@hi0$upp0tP@$$w0d"

    },
    redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: process.env.REDIS_PORT || 6379,
        keyPrefix: 'cache'
    },
    firebase: {

        type: process.env.TYPE || "service_account",
        project_id: process.env.PROJECT_ID || "archionotifications",
        private_key_id: process.env.PRIVATE_KEY_ID || "030909cf5fe11e46d46bf6239c2bd893eaa88e70",
        private_key: process.env.PRIVATE_KEY || "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCpNkwMI0a5Vvnq\n37odSyUigyVCRJqbudzCTXQ6Y5n0N1uxz4Aqg5PZmQsRd5zFwSOJNlaJYJyILmhC\nE/2WBDL/ml4IT807UqZyw5HXnL+mN64fFJ+obg77gnVZxwDFSYx5zGQ7l/Wnpa0F\ny0c60a39cI9sfgiyGJcOMYWeudWo1Cc6hYeicintJWH+1fIRZwIKH1bUJ54Fbio9\nXZMLAwI4NQNTINsAUm4bAezaZibsORVo7A7hqLlSdUh60XojyUSD8x8TdvKaUBx/\nsePDgMX40HIBhVUCM1bY8iLoTMEk8nJAm7IUdijFtMVVzJP5oGcyFsGbF2s7N1lc\nET+yGl3lAgMBAAECggEAH2PMsLW8kXZCj2Eod/WwMlpMx6HNYpUUkFDo/knqzeSV\nFIOvPXPCMiwTYw6i3QaKrpIPdJWhBBxDx/pIYRNvWH5M8lLHejlHWmPQQsS3wsBy\ngx6Cza55Bgw588kYagDOV+vkLi/u6MYxtjDzCkTKd4jxeklZGJy6LO5f4MWNjq9b\nTMC9N6IGf/bAVQlej6i+O7z0HryatwUNE66Jcs79hTQjKT+Uer983gwusaUn0F66\nVjG4AAbHwwk4nfT8zpjSziPblRTag++eQVo0JSh3SQySkf/GqQRWuzQ9+mg48j4L\nf9Endw1U68OMkm3CblJ8VWQh14HoCb+jxl/4fwL9UwKBgQDRqu+xKkltAV1BmQme\ndk3/5pfsJ4rKgzAYO9GyPALGHea40ZlApNZqDUptcH9FOzWcX01SEFQpL87o5jT3\nCBD2Lk26wzY5tQm2C3dONqZKLAOyWqWaKb/GH2FAuQUM8YVMMRgJTRGgvuOmfCTL\nlUcOtTC2T16wuIbg0BZbvW/JpwKBgQDOmsFU4IMnXTs6awFovGSS0lGhMn+hujzj\nnNbOfgcU9t0Xd2AK68R1upU2Po8uI2IxdMG4ONyK9Y6IneUx+VosQ+GOs9JvM19Z\nQzAj1cLGT0rzdgO2fbeNk3Fg5E10nsD+DicjvJWQJF72se9bvIF3Zu/aDRfMvhkK\nDNKJmcY1kwKBgDctU/z80uvz4vXjb2ubWLWSmsKUOWtIEP0fqPTN5DD9J33V8w3X\nE3I/Yynf5C51AYvQbMm+8FcSdNJH2wJzxfrzfpM60mdnZFHbPJ+BtEtqv+JNBq3G\ndOiP04kz58dbPCgr91ZjSNNTyRdELm7BLz0Io/QmeRXqydwaBvhHp0abAoGBAIB+\nANU/2HHH6wkW+cZgvJAPm9MMLBKyWCIbLgE4okDok3J/vMyt+v5ZL2mQGM5SFUS6\n36wqOQd3VtEimiOtd+ZlxUdSEQM1yQwj3DG9RSi+sdeewwphP6IeW/otovpvrYmT\n1cXFCKOf6yu0WDAOmdpfu7Y6RF4CsGHuvZX0fDBfAoGAHfS021b04jsJQncDwYyH\nR7s/el3KFQtE2ERf3c53AHi8bnZNMQU6frp/iN3vi+Tdyb4afXANfy9pYT0H+CMD\n/WMVwitip0VopSruNZG3wyfwLg/5POfgI+Qs/V8G8HZEfovglv98lRtf3EpvB6pF\n8E2DrvmHqTFHcm5jUqF0rLA=\n-----END PRIVATE KEY-----\n",
        client_email: process.env.CLIENT_EMAIL || "firebase-adminsdk-oyhui@archionotifications.iam.gserviceaccount.com",
        client_id: process.env.CLIENT_ID || "115986341073552907094",
        auth_uri: process.env.AUTH_URI || "https://accounts.google.com/o/oauth2/auth",
        token_uri: process.env.TOKEN_URI || "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL || "https://www.googleapis.com/oauth2/v1/certs",
        client_x509_cert_url: process.env.CLIENT_X509_CERT_URL || "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-oyhui%40archionotifications.iam.gserviceaccount.com",
        databaseURL: process.env.DATABASEURL || 'https://archionotifications-default-rtdb.firebaseio.com/'

    },
    icons: {
        iconerror: process.env.ICONERROR || "https://storage.googleapis.com/archiobucket/ARCHIOFILES/icons/errors.png",
        iconsuscess: process.env.ICONSUSCESS || "https://storage.googleapis.com/archiobucket/ARCHIOFILES/icons/sucess.png"
    },
    dir: {
        temp: process.env.TEMP|| '../../TEMP/',

   },
    gcpStorage: {
        credentials: process.env.GOOGLE_APPLICATION_CREDENTIALS = "./credentials.json",
        gcloud_project: process.env.GCLOUD_PROJECT = "archioqa",
        cloud_bucket: process.env.CLOUD_BUCKET = "filesarchio",
        cloud_archio_bucket: process.env.ARCHIO_BUCKET ="archiobucket",
        gcs_bucket: process.env.GCS_BUCKET = "archioqa",
        pathFiles: process.env.PATHFILES = "",
        client_email: process.env.CLIENT_EMAIL = "archiobucket@archioqa.iam.gserviceaccount.com",
        urlgcp: process.env.URLGCP || 'https://storage.googleapis.com/archiobucket/',
        urlfilesarchio: process.env.URL_FILES_ARCHIO || 'https://storage.googleapis.com/filesarchio/',
        urlThumbnails:process.env.URL_THUMBNAILS || 'https://storage.googleapis.com/archio-thumbnails',
        urlArchioBucket: process.env.URL_ARCHIO_BUCKET || 'https://storage.googleapis.com/archiobucket',

    }
}


