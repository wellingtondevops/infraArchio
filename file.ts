// // class ContractRouter extends model_router_1.ModelRouter {
// //     constructor() {
// //         super(contracts_model_1.Contract);
// //         this.save = (req, resp, next) => __awaiter(this, void 0, void 0, function* () {
// //             const { contractTemplate, company, departament } = req.body;
// //             try {
// //                 if (!contractTemplate) {
// //                     return next(new restify_errors_1.MethodNotAllowedError(`FAVOR ESCOLHA UM MODELO DE CONTRATO!`));
// //                 }
// //                 if (!company) {
// //                     return next(new restify_errors_1.MethodNotAllowedError(`FAVOR ESCOLHA UMA EMPRESA!`));
// //                 }
// //                 if (!departament) {
// //                     return next(new restify_errors_1.MethodNotAllowedError(`FAVOR ESCOLHA UM DEPARTAMENTO!`));
// //                 }
// //                 const { _id: user, mailSignup } = req.authenticated;
// //                 const hash = guid_typescript_1.Guid.raw().substring(0, 20);
// //                 const activities = {
// //                     user: user,
// //                     action: "CRIADO",
// //                     actionDate: new Date().toLocaleString('pt-BR')
// //                 };
// //                 // 6658eff3d373b8b98128c7aa
// //                 const document = new contracts_model_1.Contract({
// //                     company: company,
// //                     departament: departament,
// //                     contractTemplate: contractTemplate,
// //                     author: user,
// //                     mailSignup: mailSignup,
// //                     typeContract: req.body.typeContract,
// //                     guests: [{ user: user }],
// //                     active: true,
// //                     hash: hash,
// //                     activities: activities
// //                 });
// //                 yield document.save();
// //                 yield this.prepareOne(this.model.findById(document._id))
// //                     .select('-activities')
// //                     .then(this.render(resp, next))
// //                     .catch(next);
// //             }
// //             catch (error) {
// //                 console.error('Erro:', error);
// //                 return next(new restify_errors_1.MethodNotAllowedError("Ocorreu um erro ao Anexar um Arquivo"));
// //             }
// //         });
// //         this.upload = (req, resp, next) => __awaiter(this, void 0, void 0, function* () {
// //             try {
// //                 const sponsor = req.authenticated.mailSignup;
// //                 const { name, path, size } = req.files.file;
// //                 const folder = "CONTRACTS";
// //                 const originalName = name;
// //                 const fileName = `original-${Date.now()}-${req.params.id}.pdf`;
// //                 const pdfData = yield pdfParse(fs.readFileSync(path));
// //                 const numPages = pdfData.numpages;
// //                 const pdfBytes = yield fs.promises.readFile(path);
// //                 const hashSHA256 = (0, crypto_1.createHash)('sha256');
// //                 hashSHA256.update(pdfBytes);
// //                 const fingerprintSHA256 = hashSHA256.digest('hex');
// //                 const hashSHA512 = (0, crypto_1.createHash)('sha512');
// //                 hashSHA512.update(pdfBytes);
// //                 const fingerprintSHA512 = hashSHA512.digest('hex');
// //                 yield (0, upload_1.uploadContract)(folder, path, sponsor, fileName)
// //                     .then((result) => __awaiter(this, void 0, void 0, function* () {
// //                     const url = result;
// //                     const dataBatche = yield contracts_model_1.Contract.findOne({ _id: req.params.id });
// //                     const { contractTemplate } = dataBatche;
// //                     const attachmentFile = new attachment_files_model_1.AttachmentFile({
// //                         contractTemplate: contractTemplate,
// //                         contract: req.params.id,
// //                         mailSignup: sponsor,
// //                         originalname: originalName,
// //                         name: fileName,
// //                         size: size,
// //                         page: numPages,
// //                         originalUrl: url,
// //                         ind: false,
// //                         fingerprintOriginalSHA256: `(SHA256): ${fingerprintSHA256}`,
// //                         fingerprintOriginalSHA512: `(SHA512): ${fingerprintSHA512}`
// //                     });
// //                     yield attachmentFile.save()
// //                         .then((attachmentFile) => __awaiter(this, void 0, void 0, function* () { return yield contracts_model_1.Contract.updateOne({ _id: req.params.id }, { $set: { attachmentFile: attachmentFile._id } }); }));
// //                 }));
// //                 yield this.prepareOne(this.model.findById(req.params.id))
// //                     .then(this.render(resp, next))
// //                     .catch(next);
// //             }
// //             catch (error) {
// //                 console.error('Erro:', error);
// //                 return next(new restify_errors_1.MethodNotAllowedError("Ocorreu um erro ao Anexar um Arquivo"));
// //             }
// //         });
// //         this.deleteFile = (req, resp, next) => __awaiter(this, void 0, void 0, function* () {
// //             try {
// //                 const dataBatche = yield contracts_model_1.Contract.findOne({ _id: req.params.id }).populate('attachmentFile', 'originalname originalUrl ind');
// //                 if (!dataBatche) {
// //                     return next(new restify_errors_1.MethodNotAllowedError(`Não foi localizado Anexo a esse Contrato!`));
// //                 }
// //                 const { _id, attachmentFile } = dataBatche;
// //                 const url = attachmentFile["originalUrl"];
// //                 yield (0, deleteFileBucket_1.deleteFileBucket)(url.replace(environment_1.environment.gcpStorage.urlgcp, ''))
// //                     .catch((error) => console.error(error));
// //                 yield attachment_files_model_1.AttachmentFile.deleteOne({ _id: _id })
// //                     .catch((error) => console.error(error));
// //                 yield contracts_model_1.Contract.updateOne({ _id: req.params.id }, { $unset: { attachmentFile: 1 } })
// //                     .catch((error) => console.error(error));
// //                 yield this.prepareOne(this.model.findById(req.params.id))
// //                     .then(this.render(resp, next))
// //                     .catch(next);
// //             }
// //             catch (error) {
// //                 console.error('Erro:', error);
// //                 return next(new restify_errors_1.MethodNotAllowedError("Ocorreu um erro ao deletar o Anexo."));
// //             }
// //         });
// //         this.createContract = (req, resp, next) => __awaiter(this, void 0, void 0, function* () {
// //             try {
// //                 const initialDate = moment(req.body.initialDate).tz('America/Sao_Paulo').toDate();
// //                 const finalDate = moment(req.body.finalDate).tz('America/Sao_Paulo').toDate();
// //                 let dataTag = '';
// //                 for (const tag of req.body.tag) {
// //                     dataTag = dataTag + ' ' + tag;
// //                 }
// //                 const wordsTag = dataTag.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/Ç/g, 'C').replace(/ç/g, 'c').toString();
// //                 yield contracts_model_1.Contract.updateOne({ _id: req.params.id }, {
// //                     $set: {
// //                         tag: req.body.tag,
// //                         wordsTag: wordsTag,
// //                         initialDate: initialDate,
// //                         finalDate: finalDate
// //                     }
// //                 });
// //                 yield this.prepareOne(this.model.findById(req.params.id))
// //                     .then(this.render(resp, next))
// //                     .catch(next);
// //             }
// //             catch (error) {
// //                 console.error('Erro:', error);
// //                 return next(new restify_errors_1.MethodNotAllowedError("Ocorreu um erro ao adicionar o contrato."));
// //             }
// //         });
// //         this.sendContract = (req, resp, next) => __awaiter(this, void 0, void 0, function* () {
// //             const id = req.params.id;
// //             const { _id: user } = req.authenticated;
// //             try {
// //                 const contract = yield contracts_model_1.Contract.findOne({ _id: id });
// //                 const activities = {
// //                     user: user,
// //                     action: "ENVIADO",
// //                     actionDate: new Date().toLocaleString('pt-BR')
// //                 };
// //                 yield contracts_model_1.Contract.updateOne({ _id: contract._id }, { $set: { status: 'PENDENTE', sendDate: new Date().toLocaleString('pt-BR') }, $push: { activities: activities } })
// //                     .then(() => __awaiter(this, void 0, void 0, function* () {
// //                     const MS_CONTRACT = environment_1.environment.queues.sendContract;
// //                     yield (0, producer_1.producerMessage)(contract, MS_CONTRACT);
// //                 }));
// //                 resp.send({ message: "CONTRATO ENVIADO COM SUSCESSO, ASSIM QUE TODOS ASSINAREM VAMOS TE NOTIFICAR" });
// //             }
// //             catch (error) {
// //                 console.error('Erro:', error);
// //                 return next(new restify_errors_1.MethodNotAllowedError("Ocorreu um erro ao enviar o Contrato."));
// //             }
// //         });
// //         this.insignature = (req, resp, next) => __awaiter(this, void 0, void 0, function* () {
// //             try {
// //                 const { id: idConstract } = req.params;
// //                 const { hashContract, ip, user: userLogged } = req.body;
// //                 const dataUser = yield users_model_1.User.findById(userLogged.toString());
// //                 const { email: emailUserAuthenticated, signatureImage, _id: iduser } = dataUser;
// //                 const contract = yield contracts_model_1.Contract.findById(idConstract);
// //                 const { hashSubscriber, subscriber, subscriberTo } = contract;
// //                 if (!subscriber) {
// //                     return next(new restify_errors_1.MethodNotAllowedError(`Seu usuário não foi Convidado ainda para Assinar esse Contrato!`));
// //                 }
// //                 if (userLogged.toString() !== subscriber.toString() || subscriber === undefined) {
// //                     return next(new restify_errors_1.MethodNotAllowedError(`Seu usuário não foi Convidado ainda para Assinar esse Contrato!`));
// //                 }
// //                 if (hashSubscriber !== hashContract) {
// //                     return next(new restify_errors_1.MethodNotAllowedError(`O token ${hashContract} digitado é diferente do token enviado para seu email`));
// //                 }
// //                 const infoUser = yield users_service_1.UserService.informationUserGeo(ip);
// //                 if (infoUser.length === 0) {
// //                     return next(new restify_errors_1.MethodNotAllowedError(`Por Favor tente assinar novamente erro ao obter seu ip`));
// //                 }
// //                 const timezoneSignature = infoUser[0]["timezone"] || 'America/Sao_Paulo';
// //                 const dataSignature = Object.assign({ idConstract: idConstract.toString(), userId: userLogged.toString(), email: emailUserAuthenticated.toString(), token: hashSubscriber.toString(), signatureDate: new Date(new Date().toLocaleString('en-US', { timeZone: timezoneSignature })), info: {
// //                         ip: infoUser[0]["ip"],
// //                         city: infoUser[0]["city"],
// //                         country: infoUser[0]["country"],
// //                         region: infoUser[0]["region"],
// //                         timeZone: infoUser[0]["timezone"],
// //                         continent_code: infoUser[0]["continent_code"],
// //                         longitude: infoUser[0]["longitude"],
// //                         latitude: infoUser[0]["latitude"]
// //                     }, subscriberTo: subscriberTo }, (signatureImage !== undefined && { signatureImage: signatureImage }));
// //                 yield this.signature(dataSignature);
// //                 const activities = {
// //                     user: iduser,
// //                     action: "ASSINADO",
// //                     actionDate: new Date().toLocaleString('pt-BR')
// //                 };
// //                 yield contracts_model_1.Contract.updateOne({ _id: contract._id.toString() }, {
// //                     "$unset": {
// //                         hashSubscriber: 1,
// //                         subscriber: 1,
// //                     },
// //                     $push: {
// //                         activities: activities
// //                     },
// //                     $set: {
// //                         subscriberTo: []
// //                     }
// //                 }).then(() => __awaiter(this, void 0, void 0, function* () {
// //                     const MS_CONTRACT = environment_1.environment.queues.sendContract;
// //                     yield (0, producer_1.producerMessage)(contract, MS_CONTRACT);
// //                 }));
// //                 resp.send({ message: `Contrato Assinado com Sucesso` });
// //             }
// //             catch (error) {
// //                 console.error(error);
// //                 return next(new restify_errors_1.MethodNotAllowedError(`Erro ao Processar a Assintura!`));
// //             }
// //         });
// //         this.abort = (req, resp, next) => __awaiter(this, void 0, void 0, function* () {
// //             const id = req.params.id;
// //             const { _id: user } = req.authenticated;
// //             const data = yield contracts_model_1.Contract.findOne({ _id: id });
// //             const { status } = data;
// //             if (status === "FINALIZADO") {
// //                 return next(new restify_errors_1.MethodNotAllowedError(`Este contrato já foi Finalizado e não pode ser Canelado!`));
// //             }
// //             try {
// //                 const activities = {
// //                     user: user,
// //                     action: "CANCELADO",
// //                     actionDate: new Date().toLocaleString('pt-BR')
// //                 };
// //                 yield contracts_model_1.Contract.updateOne({ _id: id }, {
// //                     $unset: {
// //                         hashSubscriber: "",
// //                         subscriber: "",
// //                     },
// //                     $push: {
// //                         activities: activities
// //                     },
// //                     $set: {
// //                         subscriberTo: [],
// //                         status: "CANCELADO",
// //                         aborteDate: new Date().toLocaleString('pt-BR')
// //                     }
// //                 });
// //                 resp.send({ message: `Contrato Cancelado com suscesso!` });
// //             }
// //             catch (error) {
// //                 console.error(error);
// //                 return next(new restify_errors_1.MethodNotAllowedError(`Erro ao Cancelar o Contrato!`));
// //             }
// //         });
// //         this.reject = (req, resp, next) => __awaiter(this, void 0, void 0, function* () {
// //             try {
// //                 const { id: idConstract } = req.params;
// //                 const { reason } = req.body;
// //                 const contract = yield contracts_model_1.Contract.findById(idConstract.toString())
// //                     .select('-active -status  -typeContract -updatedAt -createdAt -author -attachmentFile -initialDate -finalDate -guests -contractTemplate -hash -mailSignup -wordsTag -highlight -hashSubscriber')
// //                     .populate('author', 'name')
// //                     .populate('subscriber', 'name _id');
// //                 const { subscriberTo, subscriber, tag } = contract;
// //                 if (subscriber === undefined) {
// //                     console.error(`not found subscriber`);
// //                     return next(new restify_errors_1.MethodNotAllowedError(`Erro ao Processar a Rejeição do Contrato!`));
// //                 }
// //                 if (subscriberTo === undefined || subscriberTo.length === 0) {
// //                     console.error(`not found subscriberTo`);
// //                     return next(new restify_errors_1.MethodNotAllowedError(`Erro ao Processar a Rejeição do Contrato!`));
// //                 }
// //                 const name = subscriber["name"];
// //                 const user = subscriber["_id"];
// //                 const reasonSend = `
// //             O Representante <strong>${name}</strong> rejeitou o contrato <strong>${tag[0]}</strong> pelo seguinte motivo.
// //             <br><br>
            
// //             ${reason}
// //             <br>
// //             Sendo assim todo processo de assinatura será anulado e esse contrato será Cancelado, e o Autor do Contrato será notificado para as devidas providencias.
// //             <br><br><br>

// //             Atenciosamente,

// //             <img src="https://storage.googleapis.com/archiobucket/ARCHIOFILES/PNG-05.png"width="220" height="80"/>
// //             `;
// //                 const rejectData = {
// //                     rejected: true,
// //                     finish: false,
// //                     contract: idConstract,
// //                     name: name,
// //                     emailMsg: reasonSend
// //                 };
// //                 const activities = {
// //                     user: user,
// //                     action: "REJEITADO",
// //                     actionDate: new Date().toLocaleString('pt-BR')
// //                 };
// //                 yield contracts_model_1.Contract.updateOne({ _id: idConstract }, {
// //                     $unset: {
// //                         hashSubscriber: "",
// //                         subscriber: "",
// //                     },
// //                     $push: {
// //                         activities: activities
// //                     },
// //                     $set: {
// //                         subscriberTo: [],
// //                         status: "REJEITADO",
// //                         aborteDate: new Date().toLocaleString('pt-BR')
// //                     }
// //                 }).then(() => __awaiter(this, void 0, void 0, function* () {
// //                     const NOTIFICATION_EVERYONE_INVOLVED = environment_1.environment.queues.notificationEveryoneInvolved;
// //                     yield (0, producer_1.producerMessage)(rejectData, NOTIFICATION_EVERYONE_INVOLVED);
// //                 }));
// //                 resp.send({ message: `Contrato Rejeitado com suscesso, todos envolvidos serão notificados.` });
// //             }
// //             catch (error) {
// //                 console.error(error);
// //                 return next(new restify_errors_1.MethodNotAllowedError(`Erro ao Processar a Assintura!`));
// //             }
// //         });
       
// //     }
// //     prepareOne(query) {
// //         return query
// //             .select('-updatedAt -mailSignup -hash -active -wordsTag -guests')
// //             .populate('company', 'name')
// //             .populate('departament', 'name')
// //             .populate('contractTemplate', 'name label')
// //             .populate('author', 'name')
// //             .populate('attachmentFile', 'originalname originalUrl signatureUrl ind page size');
// //     }
// //     ;
// //     envelop(document) {
// //         let resource = super.envelope(document);
// //         resource._links.menu = `${this.basePath}/${resource._id}`;
// //         return resource;
// //     }
// //     applyRoutes(applycation) {
// //         applycation.post(`${this.basePath}`, [(0, authz_handler_1.authorize)('STARK', 'DAENERYS'), this.save]);
// //         applycation.get(`${this.basePath}/:id`, [(0, authz_handler_1.authorize)('SNOW', 'TYWIN', 'DAENERYS', 'STARK', 'TULLY', 'WESTEROS', 'ARRYN'), this.validateId, this.findContract]);
// //         applycation.post(`${this.basePath}/:id/upload`, [(0, authz_handler_1.authorize)('STARK', 'DAENERYS'), this.upload]);
// //         applycation.del(`${this.basePath}/:id/deletefile`, [(0, authz_handler_1.authorize)('STARK', 'DAENERYS'), this.deleteFile]);
// //         applycation.post(`${this.basePath}/:id/index`, [(0, authz_handler_1.authorize)('STARK', 'DAENERYS'), this.createContract]);
// //         applycation.post(`${this.basePath}/:id/updatecontract`, [(0, authz_handler_1.authorize)('STARK', 'DAENERYS'), this.validateId, this.updateContract]);
// //         applycation.post(`${this.basePath}/search`, this.filterContracts);
// //         //contratante manutencao
// //         applycation.post(`${this.basePath}/:id/setcontractor`, [(0, authz_handler_1.authorize)('STARK', 'DAENERYS'), this.setContractor]);
// //         applycation.post(`${this.basePath}/:id/deletecontractor`, [(0, authz_handler_1.authorize)('STARK', 'DAENERYS'), this.deleteContractor]);
// //         applycation.get(`${this.basePath}/:id/listcontractors`, this.listContractors);
// //         //CONTRATADO manutencao
// //         applycation.post(`${this.basePath}/:id/sethired`, [(0, authz_handler_1.authorize)('STARK', 'DAENERYS'), this.setHired]);
// //         applycation.post(`${this.basePath}/:id/deletehired`, [(0, authz_handler_1.authorize)('STARK', 'DAENERYS'), this.deleteHired]);
// //         applycation.get(`${this.basePath}/:id/listhiredies`, this.listHiredies);
// //         //
// //         //envolvidos contratantes
// //         applycation.post(`${this.basePath}/:id/setrepresentativecontractor`, [(0, authz_handler_1.authorize)('STARK', 'DAENERYS'), this.setRepresentativeContractor]);
// //         applycation.post(`${this.basePath}/:id/getrepresentativecontractor`, this.getRepresentativeContractor);
// //         applycation.post(`${this.basePath}/:id/setwitnessescontractor`, [(0, authz_handler_1.authorize)('STARK', 'DAENERYS'), this.setWitnessesContractor]);
// //         applycation.post(`${this.basePath}/:id/getwitnessescontractor`, this.getWitnessesContractor);
// //         applycation.post(`${this.basePath}/:id/deleterepresentativecontractor`, [(0, authz_handler_1.authorize)('STARK', 'DAENERYS'), this.deleteRepresentativeContractor]);
// //         applycation.post(`${this.basePath}/:id/deletewitnessescontractor`, [(0, authz_handler_1.authorize)('STARK', 'DAENERYS'), this.deleteWitnessesContractor]);
// //         //envolvidos contratantes
// //         //envolvidos contratado
// //         //continue 'STARK','DAENERYS'
// //         applycation.post(`${this.basePath}/:id/setrepresentativeshired`, [(0, authz_handler_1.authorize)('STARK', 'DAENERYS'), this.setRepresentativeHired]);
// //         applycation.post(`${this.basePath}/:id/getrepresentativehired`, this.getRepresentativeHired);
// //         applycation.post(`${this.basePath}/:id/setwitnesseshired`, [(0, authz_handler_1.authorize)('STARK', 'DAENERYS'), this.setWitnessesHired]);
// //         applycation.post(`${this.basePath}/:id/getwitnesseshired`, this.getWitnessesHired);
// //         applycation.post(`${this.basePath}/:id/deleterepresentativeshired`, [(0, authz_handler_1.authorize)('STARK', 'DAENERYS'), this.deleteRepresentativeHired]);
// //         applycation.del(`${this.basePath}/:id`, [(0, authz_handler_1.authorize)('SNOW', 'TYWIN', 'DAENERYS'), this.deleteContract]);
// //         applycation.post(`${this.basePath}/:id/deletewitnesseshired`, [(0, authz_handler_1.authorize)('STARK', 'DAENERYS'), this.deleteWitnessesHired]);
// //         //envolvidos contratado
// //         ///
// //         applycation.get(`${this.basePath}/:id/sendcontract`, [(0, authz_handler_1.authorize)('STARK', 'DAENERYS'), this.sendContract]);
// //         //Assinar
// //         applycation.post(`${this.basePath}/:id/insignature`, this.insignature);
// //         applycation.post(`${this.basePath}/:id/reject`, this.reject);
// //         applycation.post(`${this.basePath}/:id/abort`, [(0, authz_handler_1.authorize)('STARK', 'DAENERYS'), this.abort]);
// //         applycation.get(`${this.basePath}/:id/showguest`, this.showGuest);
// //         applycation.get(`${this.basePath}/:id/showcontractsiginature`, this.showGuests);
// //     }
// // }
// // exports.contractRouter = new ContractRouter();

// import { ModelRouter } from 'model_router_1';
// import { Contract, AttachmentFile } from 'contracts_model_1';
// import { User } from 'users_model_1';
// import { UserService } from 'users_service_1';
// import { MethodNotAllowedError } from 'restify_errors_1';
// import { Guid } from 'guid_typescript_1';
// import { uploadContract } from 'upload_1';
// import { deleteFileBucket } from 'deleteFileBucket_1';
// import { producerMessage } from 'producer_1';
// import { environment } from 'environment_1';
// import * as moment from 'moment-timezone';
// import * as pdfParse from 'pdf-parse';
// import * as fs from 'fs';
// import * as crypto from 'crypto';

// class ContractRouter extends ModelRouter {
//     constructor() {
//         super(Contract);
//     }

//     save = async (req: any, resp: any, next: any) => {
//         const { contractTemplate, company, departament } = req.body;
//         try {
//             if (!contractTemplate) {
//                 return next(new MethodNotAllowedError(`FAVOR ESCOLHA UM MODELO DE CONTRATO!`));
//             }
//             if (!company) {
//                 return next(new MethodNotAllowedError(`FAVOR ESCOLHA UMA EMPRESA!`));
//             }
//             if (!departament) {
//                 return next(new MethodNotAllowedError(`FAVOR ESCOLHA UM DEPARTAMENTO!`));
//             }
//             const { _id: user, mailSignup } = req.authenticated;
//             const hash = Guid.raw().substring(0, 20);
//             const activities = {
//                 user: user,
//                 action: "CRIADO",
//                 actionDate: new Date().toLocaleString('pt-BR')
//             };
//             const document = new Contract({
//                 company: company,
//                 departament: departament,
//                 contractTemplate: contractTemplate,
//                 author: user,
//                 mailSignup: mailSignup,
//                 typeContract: req.body.typeContract,
//                 guests: [{ user: user }],
//                 active: true,
//                 hash: hash,
//                 activities: activities
//             });
//             await document.save();
//             await this.prepareOne(this.model.findById(document._id))
//                 .select('-activities')
//                 .then(this.render(resp, next))
//                 .catch(next);
//         } catch (error) {
//             console.error('Erro:', error);
//             return next(new MethodNotAllowedError("Ocorreu um erro ao Anexar um Arquivo"));
//         }
//     };

//     upload = async (req: any, resp: any, next: any) => {
//         try {
//             const sponsor = req.authenticated.mailSignup;
//             const { name, path, size } = req.files.file;
//             const folder = "CONTRACTS";
//             const originalName = name;
//             const fileName = `original-${Date.now()}-${req.params.id}.pdf`;
//             const pdfData = await pdfParse(fs.readFileSync(path));
//             const numPages = pdfData.numpages;
//             const pdfBytes = await fs.promises.readFile(path);
//             const hashSHA256 = crypto.createHash('sha256');
//             hashSHA256.update(pdfBytes);
//             const fingerprintSHA256 = hashSHA256.digest('hex');
//             const hashSHA512 = crypto.createHash('sha512');
//             hashSHA512.update(pdfBytes);
//             const fingerprintSHA512 = hashSHA512.digest('hex');
//             await uploadContract(folder, path, sponsor, fileName)
//                 .then(async (result: any) => {
//                     const url = result;
//                     const dataBatche = await Contract.findOne({ _id: req.params.id });
//                     const { contractTemplate } = dataBatche;
//                     const attachmentFile = new AttachmentFile({
//                         contractTemplate: contractTemplate,
//                         contract: req.params.id,
//                         mailSignup: sponsor,
//                         originalname: originalName,
//                         name: fileName,
//                         size: size,
//                         page: numPages,
//                         originalUrl: url,
//                         ind: false,
//                         fingerprintOriginalSHA256: `(SHA256): ${fingerprintSHA256}`,
//                         fingerprintOriginalSHA512: `(SHA512): ${fingerprintSHA512}`
//                     });
//                     await attachmentFile.save()
//                         .then(async (attachmentFile: any) => await Contract.updateOne({ _id: req.params.id }, { $set: { attachmentFile: attachmentFile._id } }));
//                 });
//             await this.prepareOne(this.model.findById(req.params.id))
//                 .then(this.render(resp, next))
//                 .catch(next);
//         } catch (error) {
//             console.error('Erro:', error);
//             return next(new MethodNotAllowedError("Ocorreu um erro ao Anexar um Arquivo"));
//         }
//     };

//     deleteFile = async (req: any, resp: any, next: any) => {
//         try {
//             const dataBatche = await Contract.findOne({ _id: req.params.id }).populate('attachmentFile', 'originalname originalUrl ind');
//             if (!dataBatche) {
//                 return next(new MethodNotAllowedError(`Não foi localizado Anexo a esse Contrato!`));
//             }
//             const { _id, attachmentFile } = dataBatche;
//             const url = attachmentFile["originalUrl"];
//             await deleteFileBucket(url.replace(environment.gcpStorage.urlgcp, ''))
//                 .catch((error: any) => console.error(error));
//             await AttachmentFile.deleteOne({ _id: _id })
//                 .catch((error: any) => console.error(error));
//             await Contract.updateOne({ _id: req.params.id }, { $unset: { attachmentFile: 1 } })
//                 .catch((error: any) => console.error(error));
//             await this.prepareOne(this.model.findById(req.params.id))
//                 .then(this.render(resp, next))
//                 .catch(next);
//         } catch (error) {
//             console.error('Erro:', error);
//             return next(new MethodNotAllowedError("Ocorreu um erro ao deletar o Anexo."));
//         }
//     };

//     createContract = async (req: any, resp: any, next: any) => {
//         try {
//             const initialDate = moment(req.body.initialDate).tz('America/Sao_Paulo').toDate();
//             const finalDate = moment(req.body.finalDate).tz('America/Sao_Paulo').toDate();
//             let dataTag = '';
//             for (const tag of req.body.tag) {
//                 dataTag = dataTag + ' ' + tag;
//             }
//             const wordsTag = dataTag.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/Ç/g, 'C').replace(/ç/g, 'c').toString();
//             await Contract.updateOne({ _id: req.params.id }, {
//                 $set: {
//                     tag: req.body.tag,
//                     wordsTag: wordsTag,
//                     initialDate: initialDate,
//                     finalDate: finalDate
//                 }
//             });
//             await this.prepareOne(this.model.findById(req.params.id))
//                 .then(this.render(resp, next))
//                 .catch(next);
//         } catch (error) {
//             console.error('Erro:', error);
//             return next(new MethodNotAllowedError("Ocorreu um erro ao adicionar o contrato."));
//         }
//     };

//     sendContract = async (req: any, resp: any, next: any) => {
//         const id = req.params.id;
//         const { _id: user } = req.authenticated;
//         try {
//             const contract = await Contract.findOne({ _id: id });
//             const activities = {
//                 user: user,
//                 action: "ENVIADO",
//                 actionDate: new Date().toLocaleString('pt-BR')
//             };
//             await Contract.updateOne({ _id: contract._id }, { $set: { status: 'PENDENTE', sendDate: new Date().toLocaleString('pt-BR') }, $push: { activities: activities } })
//                 .then(async () => {
//                     const MS_CONTRACT = environment.queues.sendContract;
//                     await producerMessage(contract, MS_CONTRACT);
//                 });
//             resp.send({ message: "CONTRATO ENVIADO COM SUSCESSO, ASSIM QUE TODOS ASSINAREM VAMOS TE NOTIFICAR" });
//         } catch (error) {
//             console.error('Erro:', error);
//             return next(new MethodNotAllowedError("Ocorreu um erro ao enviar o Contrato."));
//         }
//     };

//     insignature = async (req: any, resp: any, next: any) => {
//         try {
//             const { id: idConstract } = req.params;
//             const { hashContract, ip, user: userLogged } = req.body;
//             const dataUser = await User.findById(userLogged.toString());
//             const { email: emailUserAuthenticated, signatureImage, _id: iduser } = dataUser;
//             const contract = await Contract.findById(idConstract);
//             const { hashSubscriber, subscriber, subscriberTo } = contract;
//             if (!subscriber) {
//                 return next(new MethodNotAllowedError(`Seu usuário não foi Convidado ainda para Assinar esse Contrato!`));
//             }
//             if (userLogged.toString() !== subscriber.toString() || subscriber === undefined) {
//                 return next(new MethodNotAllowedError(`Seu usuário não foi Convidado ainda para Assinar esse Contrato!`));
//             }
//             if (hashSubscriber !== hashContract) {
//                 return next(new MethodNotAllowedError(`O token ${hashContract} digitado é diferente do token enviado para seu email`));
//             }
//             const infoUser = await UserService.informationUserGeo(ip);
//             if (infoUser.length === 0) {
//                 return next(new MethodNotAllowedError(`Por Favor tente assinar novamente`));
//             }
//             const { city, state, country, countryCode, region } = infoUser;
//             const activities = {
//                 user: userLogged,
//                 action: "ASSINADO",
//                 actionDate: new Date().toLocaleString('pt-BR'),
//                 ip: ip,
//                 region: region,
//                 city: city,
//                 state: state,
//                 country: country,
//                 countryCode: countryCode
//             };
//             await Contract.updateOne({ _id: idConstract }, {
//                 $set: {
//                     status: subscriberTo ? 'PENDENTE' : 'CONCLUIDO',
//                     signerOne: { emailUserAuthenticated, signatureImage, iduser, dataSignature: new Date().toLocaleString('pt-BR'), ip, region, city, state, country, countryCode }
//                 }, $push: { activities: activities }
//             });
//             await this.prepareOne(this.model.findById(idConstract))
//                 .then(this.render(resp, next))
//                 .catch(next);
//         } catch (error) {
//             console.error('Erro:', error);
//             return next(new MethodNotAllowedError("Ocorreu um erro ao Assinar o contrato."));
//         }
//     };

//     getContractsUser = async (req: any, resp: any, next: any) => {
//         try {
//             const { _id: iduser, mailSignup } = req.authenticated;
//             await Contract.find({ mailSignup: mailSignup, guests: { $elemMatch: { user: iduser } } })
//                 .populate('company', 'name')
//                 .populate('attachmentFile', 'originalname')
//                 .then(this.renderAll(resp, next))
//                 .catch(next);
//         } catch (error) {
//             console.error('Erro:', error);
//             return next(new MethodNotAllowedError("Erro ao buscar todos os contratos do usuário"));
//         }
//     };

//     applyRoutes(application: any) {
//         // application.post(`${this.basePath}`, [this.save]);
//         // application.post(`${this.basePath}/upload/:id`, [this.upload]);
//         // application.delete(`${this.basePath}/deleteFile/:id`, [this.deleteFile]);
//         // application.put(`${this.basePath}/createContract/:id`, [this.createContract]);
//         // application.put(`${this.basePath}/sendContract/:id`, [this.sendContract]);
//         // application.put(`${this.basePath}/insignature/:id`, [this.insignature]);
//         // application.get(`${this.basePath}/userContracts`, [this.getContractsUser]);
//     }
// }
// export const contractRouter = new ContractRouter();


const activities = {
    user: user,
    action: "CRIADO",
    actionDate: new Date().toLocaleString('pt-BR')
};