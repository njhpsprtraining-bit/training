// src/data/seedData.js
// Pre-loaded from Google Sheet Form Responses tab

import { uid as makeId } from '../utils';
import crypto from 'crypto';

function mkid(name, card) {
  // deterministic ID based on name+card
  let hash = 0;
  const str = `njhps_${card}_${name}`;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(36).padStart(8, '0');
}

const T = (card, name, email, father, blood, contact, em, inst, disc, stream, period, from, to, gender) => ({
  id: mkid(name, card),
  cardNo: card, name, email: email || '', fatherName: father || '',
  bloodGroup: blood || '', contact: contact || '', emergencyContact: em || '',
  institution: inst || '', discipline: disc || '', stream: stream || '',
  trainingPeriod: period || '', fromDate: from || '', toDate: to || '',
  legacyFrom: from || '', legacyTo: to || '',
  gender: gender || '', chqRef: '', chqDate: '', reportDate: '', source: 'sheet'
});

export const SEED_TRAINEES = [
  T(305,'Tanuja Sahjeta','tanujasahjeta999@gmail.com','P.L Sahjeta','B+','8894613366','9418648022','Green hills engineering college','Degree','Civil','14 days','2022-06-13','2022-07-09','सुश्री'),
  T(331,'Himani','himanipahariya818@gmail.com','Sh. Dinesh kumar','B+','7876668204','9882102492','Govt. Polytechnic kullu','Diploma','Civil','45 days','2022-06-26','2022-07-29','सुश्री'),
  T(332,'Muskaan Negi','muskaannegi007@gmail.com','Jai parkash negi','A+','9418016842','7807357319','UIET','Degree','EEE','4 weeks','2022-07-07','2022-08-04','सुश्री'),
  T(333,'Lakshya Gupta','lakshya1940198@akgec.ac.in','','B+','8800865744','7011735004','AKG Engineering college','Degree','Mechanical Engineering','4 weeks','2022-07-11','2022-08-07','श्री'),
  T(334,'Shivam','shiavmkashyap@gmail.com','Raman kishor','B+','8894856006','7807078048','Shoolini university','Degree','Civil engineering','6 weeks','2022-07-11','2022-08-22','श्री'),
  T(335,'Gaurav Singh','gsingh862907@gmail.com','Bir Singh','O+','8626987286','7818815629','Tulas Institute','Degree','EEE','4 Weeks','2022-07-15','2022-08-11','श्री'),
  T(336,'Rahul','toshompa143@gmail.com','Diwan Chand','O+','7876427009','7876427009','Govt Polytechnic Paonta Sahib','Diploma','Electrical Engineering','4 Weeks','2022-08-01','2022-08-28','श्री'),
  T(337,'Jyoti devi','jyotikumarikumari933@gmail.com','Brij Lal','B+','8580984408','9418441321','Government polytechnic clg baru','Diploma','Electrical engineering','4 Weeks','2022-08-01','2022-08-28','सुश्री'),
  T(338,'Saurav sharma','26sauravsharma@gmail.com','Rajinder kumar','B+','9816231607','9418042405','Govt poly paonta sahib','Diploma','Electrical engg','4 weeks','2022-08-01','2022-08-28','श्री'),
  T(339,'Mohammed Aman','amankhan17080806@gmail.com','Jamil Akhter','B+','8091032736','9816077395','Govt. Poly poanta shaib','Diploma','Electrical engg','4 weeks','2022-08-01','2022-08-28','श्री'),
  T(340,'Aakanksha Sharma','doultaakansha@gmail.com','Sheesh Kumar Sharma','','7807846960','9418109160','Government Polytechnic College Kinnour','Diploma','Civil engineering','6 week','2022-08-01','2022-09-11','सुश्री'),
  T(341,'Abhijeet','abhijeetrana9876@gmail.com','Sh. Ramesh chand','A+','9015163042','8988073832','Govt. Polytechnic Sundernagar','Diploma','Electrical Engineering','4 weeks','2022-08-02','2022-08-29','श्री'),
  T(342,'Saksham Gupta','gsaksham917@gmail.com','Harish Gupta','B+','7018883576','9418054835','Govt. Polytechnic sundernagar','Diploma','Mechanical engineering','4 weeks','2022-08-03','2022-08-30','श्री'),
  T(343,'Vijay','royvijay115@gmail.com','Sh. GOVIND SINGH','B+','8626992036','7018357282','Govt. Polytechnic Sundernagr','Diploma','Mechanical engineering','4 weeks','2022-08-03','2022-08-30','श्री'),
  T(344,'Deepak Kumar Bhengra','bhengradeepak99@gmail.com','Atowa Bhengra','A+','8219220384','8628946658','Government Polytechnic College Sundernagar','Diploma','Mechanical Engineering','4 Weeks','2022-08-03','2022-08-30','श्री'),
  T(345,'Shivam','shivamdoulta774@gmail.com','Sh. Sukha Nand Sharma','B+','8091012745','9418441364','Govt. Polytechnic Kinnour','Diploma','Civil engineering','4 weeks','2022-08-04','2022-08-31','श्री'),
  T(346,'Shubham','shubhamsharma69460@gmail.com','Sh. Sukha Nand Sharma','B+','8091012746','9418441364','Govt. Polytechnic kinnour','Diploma','Civil engeenering','4 weeks','2022-08-04','2022-08-31','श्री'),
  T(347,'CHINTAMANI','vickyvermaji1999@gmail.com','BHEEM SAIN','AB+','7018826897','8627061366','L.R group of institute solan','Diploma','Electrical engineer','4 weeks','2022-08-05','2022-09-01','श्री'),
  T(348,'Kunal','Kunalsharma9291@gmail.com','Rajiv sharma','AB-','8091785665','8219498373','LR group solan','Diploma','Electrical Engineering','4 weeks','2022-08-05','2022-09-01','श्री'),
  T(349,'Sanjay Dev','sanjaythakur1438@gmail.com','Ved Ram','AB-','9015178490','9459022646','Lr polytechnic solan','Diploma','Electrical engineering','4 weeks','2022-08-08','2022-09-04','श्री'),
  T(350,'Rajan','negir4009@gmail.com','Layak ram','B+','6230691169','9459301308','LR polytechnic solan','Diploma','Electrical engineering','4 weeks','2022-08-09','2022-09-05','श्री'),
  T(351,'Lalit thakur','lalitthakur69849@gmail.com','Hera lal','B+','8968990582','8968990582','Lr group of institute','Diploma','Electrical','4 weeks','2022-08-10','2022-09-06','श्री'),
  T(352,'Bhavesh Thakur','thakurbhavesh707@gmail.com','Baldev Thakur','AB+','9736571305','7018897527','LR Polytechnic Solan','Diploma','Electrical Engineering','4 Weeks','2022-08-10','2022-09-06','श्री'),
  T(353,'Hemraj','gugglikashyap@outlook.com','Shobharam','A+','8219689131','9816424815','L.R polytechnic solan','Diploma','Electrical Engineering','4 weeks','2022-09-10','2022-09-06','श्री'),
  T(354,'Rishav Duglet','98duglet@gmail.com','Ram Lal Duglet','A-','7018745981','9418465290','Govt PG College Dharamshala','Degree','HR','30 days','2022-08-16','2022-09-14','श्री'),
  T(355,'Omprakash','op8287407@gmail.com','Premlal','AB+','9015030486','9015030486','Lr group of institutes','Diploma','Electrical','28 days','2022-08-16','2022-09-12','श्री'),
  T(356,'Rohit Rana','rohit.rana2472000@gmail.com','Randeep Singh','B+','7651028532','7018912622','Govt. PG college Dharamshala','Degree','HR','30 days','2022-08-16','2022-09-14','श्री'),
  T(357,'Archit Gupta','20bee024@nith.ac.in','Manoj Kumar Gupta','O+','9015035001','9418169645','NIT HAMIRPUR','Degree','Electrical','3 weeks','2022-12-16','2023-01-05','श्री'),
  T(358,'Abhishek Kumar','abhikumar1720005@gmail.com','Ishwar Singh','B+','8626987084','8219604294','HPU Business School Shimla','Degree','MBA-HR','6 weeks','2022-12-30','2023-02-10','श्री'),
  T(359,'Priyanshu kumar','priyanshukaushal5593@gmail.com','Pawan kumar','A+','7807775690','9418075690','Shoolini university','Degree','BTech EE','45 days','2023-01-02','2023-02-15','श्री'),
  T(360,'Nikhil Bharti','nikhilniks567@gmail.com','Kuldeep Chand','B+','8219323536','9418475227','Chitkara University','Degree','Mechanical Engineering','3 months','2023-01-02','2023-04-01','श्री'),
  T(361,'Aryan Sood','asood3_be19@thapar.edu','Rahul Sood','O+','8580893096','8219652397','Thapar Institute','Degree','Electrical','3 months','2023-01-02','2023-06-23','श्री'),
  T(362,'Vibhor Chauhan','vibhorchauhan0517@gmail.com','Govind Singh Chauhan','O+','9805330158','7018569307','Chitkara University punjab','Degree','BE EE','5 Months','2023-01-02','2023-04-01','श्री'),
  T(363,'Ajay Gupta','guptaajay7724@gmail.com','Mr Hukam Chand Gupta','A+','8219521142','9418816268','Bahra university','Degree','Mechanical Engineering','3 months','2023-02-01','2023-04-30','श्री'),
  T(364,'Prikshit Verma','adityaprikshit@gmail.com','Ved Prakash','AB-','8219412981','9817087881','ABVGIET Pragati Nagar Shimla','Degree','Electrical Engineering','4 months','2023-02-23','2023-05-22','श्री'),
  T(365,'Utkarsh Rana','princerana8521@gmail.com','Surender Singh Rana','B+','8219490448','9418037055','RGGEC Nagrota Bagwan','Degree','Electrical Engineering','3 Months','2023-02-24','2023-05-23','श्री'),
  T(366,'Mohit Sharma','mohibhanu786@gmail.com','Sh. Madan Lal','B+','8628926277','8988665501','GREEN HILLS ENGG.COLLEGE SOLAN','Degree','ELECTRICAL ENGINEERING','4 Months','2023-02-27','2023-05-26','श्री'),
  T(367,'Anuj Pancharas','negianuj340@gmail.com','Sh. Nar Kumar','B+','8219646546','9816633660','Govt Hydro Engineering college','Degree','Electrical','4 months','2023-02-28','2023-05-27','श्री'),
  T(368,'Anshuman Tayal','anshul98057@gmail.com','Sh. Neeraj Tayal','AB+','8629882969','7018171510','GOVT. ITI Rampur Bushahr','ITI','ELECTRICIAN','1 Month','2023-03-17','2023-04-16','श्री'),
  T(369,'Vaibhav kant','vaibhavkantb@gmail.com','Morar kant','O+','9015188406','9816174252','I.T.I. Rampur','ITI','Electrician','1 month','2023-03-17','2023-04-16','श्री'),
  T(370,'Kuldeep','sirazee521@gmail.com','Trilok raj','AB+','8278867109','8278867109','Govt.ITI.Rampur','ITI','Electrician','1 month','2023-03-17','2023-04-16','श्री'),
  T(371,'Praveen kumar','praveenbushahri69@gmail.com','Ramesh','B+','869831773','8219792550','Govt.iti rampur bushahr','ITI','Electrician','1 month','2023-03-17','2023-04-16','श्री'),
  T(372,'Nikhil Verma','vermaniks61@gmail.com','Mr.Krishan Verma','AB+','8278719503','7876719193','GOVT ITI RAMPUR BUSHAR','ITI','ELECTRICIAN','1 month','2023-03-17','2023-04-16','श्री'),
  T(373,'Vikram Singh','vs838802@gmail.com','Sh.Raja Ram','B+','7876200250','7807554507','Govt.I.T.I. Rampur bushahr','ITI','Electrician','1 month','2023-03-17','2023-04-16','श्री'),
  T(374,'Manoj Negi','ankuthalu21@gmail.com','Dev krishan','B+','9459241531','8580403097','Govt ITI Rampur bushar','ITI','Electrician','1 month','2023-03-17','2023-04-16','श्री'),
  T(375,'Tarun','mehtatarun2002@gmail.com','Chunni lal','AB+','8894125003','9816101406','Govt.iti','ITI','Electrician','1 month','2023-03-17','2023-04-16','श्री'),
  T(376,'Loveneet Rajtu','loveneetrajtu1@gmail.com','Sh. Hem Raj','A+','8580497975','8580889414','Govt. ITI Rampur Bushahr','ITI','Electrician','1 Month','2023-03-17','2023-04-16','श्री'),
  T(377,'Priti khojan','pritykhojan666@gmail.com','Kavi raj','A+','7018652313','7807059092','Govt.i.t.i rampur bushahr','ITI','Electrician','1 month','2023-03-17','2023-04-16','सुश्री'),
  T(378,'Sher singh','shersinghsher810@gmail.com','Inder singh','O+','7807360443','9459588349','Govt. I. T. I rampur bushahar','ITI','Electrician','1 Month','2023-03-17','2023-04-16','श्री'),
  T(379,'Baby','joshibabes840@gmail.com','Sh. Devi saran','B-','9015027396','8580764377','Govt. iTI. RAMPUR bushahr','ITI','Electrician','1 month','2023-03-17','2023-04-16','सुश्री'),
  T(380,'Ritika Bandhu','ritikabandhu04@gmail.com','Sh. Rajesh kumar','AB+','8091014656','7807430956','Govt.ITI Rampur Bsr.','ITI','Electrician','1 month','2023-03-17','2023-04-16','सुश्री'),
  T(381,'Suraj kumar','sk5778956@gmail.com','Sh.Noor Chand','AB+','7018850921','7876479101','Govt. ITI Rampur BSR','ITI','Electrician','1 month','2023-03-17','2023-04-16','श्री'),
  T(382,'Manoj Kumar','ankunegi097@gmail.com','Dev Krishan','B+','8580403097','9459241531','Govt ITI Rampur bushar','ITI','Electrician','1 month','2023-03-17','2023-04-16','श्री'),
  T(383,'Hameed kumar','hameedmahid01@gmail.com','Sh.Pune Ram','AB+','8628837230','9015188406','Govt.ITI Rampur Bushahr','ITI','Electrician','1 month','2023-03-17','2023-04-16','श्री'),
  T(384,'Yashwant','thakuryashwant437@gmail.com','Jai ram','O+','8219147012','7807958766','Govt ITI Rampur Brs.','ITI','Electrician','1 month','2023-03-17','2023-04-16','श्री'),
  T(385,'Ved Prakash','vedo4296@gmail.com','Sh- Narender kumar','B+','8580450791','8219528534','Govt .ITI.Rampur Bushahr','ITI','Electrician','1 month','2023-03-17','2023-04-16','श्री'),
  T(386,'Ravinder Kumar','ravinderpandu58@gmail.com','Desh Raj','AB+','7876765758','9459485227','Govt iti Rampur bushar','ITI','Electrician','1 month','2023-03-17','2023-04-16','श्री'),
  T(387,'Vikas mehta','vikasmehta7789@gmail.com','Sh.Satpal','A+','9805254745','9805254745','I.T.I','ITI','Electrician','1 month','2023-03-17','2023-04-16','श्री'),
  T(388,'Anmol Singh','anmolsinght926@gmail.com','Avtar Singh','B+','8219357185','9817448431','NIT Hamirpur','Degree','Mechanical Engineering','1 Month','2023-03-17','2023-04-16','श्री'),
  T(389,'Kanishka','kanishkamehra111@gmail.com','Sh. Pawan kumar','A+','9015267277','9882892457','NIT Hamirpur','Degree','Mechanical Engineering','4 weeks','2023-03-17','2023-04-16','सुश्री'),
  T(390,'Adityansh Thakur','adityansh.thakur2003@gmail.com','Vinod Kumar','A+','7717371235','8544799914','NIT Hamirpur','Degree','Mechanical engineering','1 Month','2023-03-17','2023-04-16','श्री'),
  T(391,'Archit Gupta','archit0402@gmail.com','Manoj Kumar Gupta','O+','9015035001','9805169645','NIT Hamirpur','Degree','Electrical','2 months','2023-05-19','2023-07-10','श्री'),
  T(392,'Nishchal','nishchal191@gmail.com','Shyam Lal','AB+','9015041138','9418616660','NIT Hamirpur','Degree','Mechanical','1 month','2023-05-20','2023-06-19','श्री'),
  T(393,'Vansh aggarwal','vanshaggarwal2003@gmail.com','Sh Vikas Aggarwal','A+','9459614520','9418036091','Nit hamirpur','Degree','Btrch mech','4 Weeks','2023-05-20','2023-06-20','श्री'),
  T(394,'Ankit Negi','ankitnegi30.ak@gmail.com','Mohan Singh Negi','O-','8219682990','9805573894','NIT HAMIRPUR','Degree','Mechanical Engineering','4 week','2023-05-22','2023-06-21','श्री'),
  T(395,'Sonam Youdon','sonamfanva4@gmail.com','Ashok Kumar','B+','7807505835','9418925835','NIT Hamirpur','Degree','Electronics and Communication Engineering','2 Months','2023-05-23','2023-07-21','सुश्री'),
  T(396,'Sonam tashi','21bme120@nith.ac.in','Angchuk dorje','O+','8580857226','9459478933','Nit hamirpur','Degree','Mechanical engineering','8 weeks','2023-05-23','2023-07-21','श्री'),
  T(397,'Gaurav Verma','20bce010@nith.ac.in','Gopal Verma','AB+','8219863503','9418647101','NIT Hamirpur','Degree','Civil Engineering','6 Weeks','2023-05-30','2023-07-10','श्री'),
  T(398,'SHIVAM SHARMA','20bce029@nith.ac.in','RAM GOPAL SHARMA','B+','8580547010','9805084697','NIT HAMIRPUR','Degree','CIVIL ENGINEERING','6 Weeks','2023-05-30','2023-07-10','श्री'),
  T(399,'Pallavi Thakur','','Chander Mani','','','','NIT HAMIRPUR','Degree','Electrical Engg','1 month','2023-05-30','2023-06-29','सुश्री'),
  T(400,'Ishita','','Lal Singh','','','','NIT HAMIRPUR','Degree','Electrical Engg','1 month','2023-05-30','2023-06-30','सुश्री'),
  T(401,'Abhishek','20bme090@nith.ac.in','Surender Pal','B+','8580596475','9625378189','NIT Hamirpur','Degree','Mechanical engineering','6 weeks','2023-06-02','2023-07-13','श्री'),
  T(402,'Aaditya koundal','20bme111@nith.ac.in','Sunil kumar','B+','9015138454','8219291198','NIT hamirpur','Degree','Mechanical','6 weeks','2023-06-02','2023-07-13','श्री'),
  T(403,'Nikhil Kumar','20bme084@nith.ac.in','Manohar Lal','O+','9015043426','9418042022','NIT Hamirpur','Degree','Mechanical Engineering','6 weeks','2023-06-02','2023-07-13','श्री'),
  T(404,'AKANSHA SINGH','akanshasingh05052000@gmail.com','Mr. RAJU PRATAP SINGH','A+','8278702903','9418452018','Punjabi University Patiala','Degree','MBA(HR)','8 week','2023-06-05','2023-07-31','सुश्री'),
  T(405,'Saivya Chaudhary','','Ashwani Chaudhary','','','','Thapar institute Patiala','Degree','Electrical','1 week','2023-06-08','2023-06-14','सुश्री'),
  T(406,'vipin negi','vipinmarya4@gmail.com','Durga Singh negi','A+','6230314405','6230314405','UIET Panjab University Chandigarh','Degree','Mechanical engineering','4 weeks','2023-06-28','2023-07-25','श्री'),
  T(407,'Varun Koundal','varunkoundal6@gmail.com','Vijay Kumar','B+','7807149015','8894127421','Central University of HP Dharamshala','Degree','Finance','6 Weeks','2023-07-03','2023-08-13','श्री'),
  T(408,'Sakshi','thkursakshi99@gmail.com','Prem Singh','B+','8988344400','6230526553','Central university of HP','Degree','MBA(HR)','6 weeks','2023-07-04','2023-08-13','सुश्री'),
  T(409,'Ankush Chouhan','chouhanankush991@gmail.com','Subhash Chand','AB+','9816211329','9816646946','Central University of HP','Degree','Human Resource','6 weeks','2023-07-05','2023-08-13','श्री'),
  T(410,'Akshat','bhardwajakshat201@gmail.com','Sh Naresh bhardwaj','AB-','9817527961','8219685818','Baddi University','Degree','Electrical engineering','42 days','2023-07-15','2023-08-25','श्री'),
  T(411,'Nishant','nishantbawa402@gmail.com','Sanjay kumar','B','7807466014','9816459514','ABVGIET PRAGATINAGAR','Diploma','Electrical','28 Days','2023-07-24','2023-08-20','श्री'),
  T(412,'Mohit Chauhan','mohitchauhan1767@gmail.com','Mr. HIRA SINGH','B+','7876661767','8219970895','ABVGIET PRAGATINAGAR','Diploma','Electrical Engineering','28 Days','2023-07-24','2023-08-20','श्री'),
  T(413,'Nikhil Rana','rananikhil476@gmail.com','Mr. Jagdish','B+','9015468377','8219132891','ABVGIET PRAGATINAGAR','Diploma','Electrical','28 Days','2023-07-24','2023-08-20','श्री'),
  T(414,'Ankit Kapoor','ak7110068@gmail.com','Charan dass','AB+','9459916826','9459916826','A.B.V.G.I.E.T Pragatinagar','Diploma','Electrical engineering','28 days','2023-07-24','2023-08-20','श्री'),
  T(415,'Ankush Bhatia','bhatiaankush2005@gmail.com','Satish Kumar','O+','7876746022','9418457496','Govt. Polytechnic Sundernagar','Diploma','Electrical Engineering','1 month','2023-07-24','2023-08-22','श्री'),
  T(416,'Abhishek Barmota','abhishekbarmota5@gmail.com','Satpal','O+','8580910931','8894308321','Govt polytechnic paonta sahib','Diploma','Electrical engineering','1 month','2023-07-24','2023-08-22','श्री'),
  T(417,'Sahil Thakur','sahilthakur09102003@gmail.com','Dhani ram thakur','B+','9816528377','9816528377','ABVGIET pragatinagar','Diploma','Electrical engineering','28 days','2023-07-24','2023-08-20','श्री'),
  T(418,'Sahil','sahilapollshimla124@gmail.com','Roop Singh','AB+','7876616245','8894800941','Govt.polytechnic paonta sahib','Diploma','Electrical engineering','28 days','2023-07-24','2023-08-22','श्री'),
  T(419,'Vikas','vikas22vks@gmail.com','Sh.Hukam Ram','B+','9015287232','7876270941','Government Polytechnic Sundernagar','Diploma','Mechanical Engineering','28 days','2023-07-25','2023-08-21','श्री'),
  T(420,'Dimple kumari','dimpe175024@gmail.com','Nok singh','B+','7018842482','9805942029','Govt.polytechnic Rohru','Diploma','Civil engineering','4 week','2023-07-25','2023-08-21','सुश्री'),
  T(421,'Ananya Bharti','ananyabharti170@gmail.com','Subhash Chand Bharti','B+','7018812908','9418475082','Government polytechnic rohru','Diploma','Civil engineering','4 week','2023-07-25','2023-08-21','सुश्री'),
  T(422,'Hitesh bharti','hiteshbharti8634@gmail.com','SH BUDH RAM','B+','8627882634','8091295634','Govt polytechnic rohru','Diploma','Civil ENGG','4 weeks','2023-07-25','2023-08-21','श्री'),
  T(423,'Nikhil','nikhilsharma8123@gmail.com','Narender Sharma','A+','8352034669','8352034669','Ghec','Diploma','Electrical engineering','28 days','2023-07-25','2023-08-21','श्री'),
  T(424,'Shubham Chaudhary','shubham18546@gmail.com','Ram singh','O+','8219795420','8219795420','Ghec','Diploma','Electrical','28 days','2023-07-25','2023-08-21','श्री'),
  T(425,'David','negidavid36@gmail.com','Rajender kumar','O+','8628984785','8219795420','Green hills polytechnic college','Diploma','Electrical engineering','4 week','2023-07-25','2023-08-21','श्री'),
  T(426,'Pankaj kumar','pankaj13kumar21@gmail.com','Rajesh kumar','B+','9805694307','9418065477','Government polytechnic kinnaur','Diploma','civil engineering','28 days','2023-07-25','2023-08-21','श्री'),
  T(427,'Vishal','vishalsharma98767@gmail.com','Suresh','B+','7876053788','7876407723','Government Polytechnic Paonta Sahib (Sirmour)HP','Diploma','Electrical Engineering','4 weeks','2023-07-26','2023-08-24','श्री'),
  T(428,'Chetan Verma','chetanverma1062@gmail.com','Sh.Dinesh kumar','A+','7876333531','9625029115','Govt.polytechnic Paonta Sahib (Sirmour)','Diploma','Electrical engineering','4 weeks','2023-07-26','2023-08-24','श्री'),
  T(429,'Hariom','hariomrajpoot498@gmail.com','Mohan Singh','O+','7649967657','9418247883','Govt.Polytechnic Paonta Sahib (SIRMOUR) H.P','Diploma','Electrical Engineering','28 days','2023-07-26','2023-08-24','श्री'),
  T(430,'Hritik Vekta','hritikvekta@gmail.com','Rajender Singh','O+','8580552420','8988857509','A.B.V.G.I.E.T Pragatinagar','Degree','Electrical Engg.','6 Weeks','2023-08-01','2023-09-11','श्री'),
  T(431,'Deepak Thakur','deepak8580598355@gmail.com','Yogender','B+','8580598355','9418662122','ABVGIET pragtinagar Shimla','Degree','Electrical Engineering','6 Weeks','2023-08-01','2023-09-11','श्री'),
  T(432,'Vanshaj','vanshajsharma06@gmail.com','DINESH SHARMA','O+','8091704182','6230504182','ABVGIET Pragatinagar Shimla','Degree','Electrical engineering','6 weeks','2023-08-01','2023-09-11','श्री'),
  T(433,'Suraj Kumar','suraj.negi15@gmail.com','Prakash Chand','B+','8894155392','9459312818','AVBGIET Pragatinagar Shimla','Degree','Electrical Engineering','6 Weeks','2023-08-01','2023-09-11','श्री'),
  T(434,'Yogesh','yogeshgautam2526@gmail.com','Dinesh kumar','B+','7807841922','9459231922','ABVGIET pragatinagar','Degree','Electrical Engineering','6 weeks','2023-08-01','2023-09-11','श्री'),
  T(436,'Pankaj','pankaj00panku00@gmail.com','Guddu ram','B+','7876740456','7876740456','ITI KUMARSAIN','ITI','Electrician','Month','2023-11-20','2023-12-20','श्री'),
  T(437,'Sanjeev','sankashyapdj8@gmail.com','Sushil Kumar','AB-','8219602114','8894576607','Govt ITI kumarsain','ITI','Electrician','1 Month','2023-11-20','2023-12-20','श्री'),
];

// Historical orders from the orders tab
// Groups and orders will be minimal - just tracking order numbers and certs
const mkGid = (key) => { let h=0; for(let c of key){h=(h<<5)-h+c.charCodeAt(0);h|=0;} return 'g'+Math.abs(h).toString(36); };
const mkOid = (key) => { let h=0; for(let c of key){h=(h<<5)-h+c.charCodeAt(0);h|=0;} return 'o'+Math.abs(h).toString(36); };

// Order data: [orderNo, issueDate, [cards], certData: {card: [certNo, dispatchNo, certDate]}]
const ORDER_DATA = [
  ['1545-48','2022-07-11',[332],{332:['88','2071','2022-08-05']}],
  ['1549-52','2022-07-11',[333],{}],
  ['1572-76','2022-07-12',[334],{334:['97','2225','2022-08-21']}],
  ['1585-88','2022-07-15',[335],{335:['90','2130','2022-08-10']}],
  ['821-25','2022-08-01',[336],{336:['100','2312','2022-08-27']}],
  ['826-30','2022-08-01',[337],{337:['101','2316','2022-08-27']}],
  ['831-35','2022-08-01',[338],{338:['99','2311','2022-08-27']}],
  ['836-40','2022-08-01',[339],{339:['98','2310','2022-08-27']}],
  ['841-45','2022-08-01',[340],{340:['111','2379','2022-08-30']}],
  ['851-56','2022-08-02',[341],{341:['103','2339','2022-08-29']}],
  ['1918-23','2022-08-03',[342,343,344],{}],
  ['1924-29','2022-08-04',[345,346],{345:['112','2380','2022-08-30'],346:['92','2378','2022-08-30']}],
  ['1932-35','2022-08-05',[347,348],{347:['102','2449',''],348:['104','2448','2022-09-01']}],
  ['1941-45','2022-08-08',[349],{349:['105','2447','2022-09-03']}],
  ['1952-57','2022-08-09',[350],{350:['109','2541','2022-09-06']}],
  ['1958-11','2022-08-10',[351],{351:['107','2542','2022-09-06']}],
  ['1962-68','2022-09-10',[352,353],{353:['108','2535','2022-09-06']}],
  ['2025-31','2022-08-16',[354],{354:['115','2653','2022-09-14']}],
  ['2032-37','2022-08-16',[355],{355:['110','2593','2022-09-12']}],
  ['2051-53','2022-08-16',[356],{356:['114','2654','2022-09-14']}],
  ['2896-99','2022-12-16',[357],{357:['194','4390','2023-01-12']}],
  ['563-3001','2022-12-30',[358],{358:['198','4870','2023-02-15']}],
  ['563-4183','2023-01-02',[359],{359:['195','5434','2023-03-29']}],
  ['563-3005','2023-01-02',[360],{360:['197','44','2023-04-05']}],
  ['563-3006','2023-01-02',[361],{361:['123','956','2023-05-31']}],
  ['563-3007','2023-01-02',[362],{362:['119','983','2023-05-31']}],
  ['563-3008','2023-02-01',[363],{363:['124','1296','2023-06-15']}],
  ['3655-59','2023-02-23',[364],{364:['','1368','2023-06-21']}],
  ['3660-64','2023-02-24',[365],{365:['154','1401','2023-06-23']}],
  ['3661-65','2023-02-27',[366],{366:['153','1431','2023-06-26']}],
  ['3687-90','2023-02-27',[367],{367:['152','1430','2023-06-26']}],
  // ITI batch - 20 trainees same order
  ['3754-60','2023-03-17',[368,369,370,371,372,373,374,375,376,377,378,379,380,381,382,383,384,385,386,387],{
    368:['131','241','2023-04-17'],369:['200','238','2023-04-17'],370:['141','251','2023-04-17'],
    371:['133','252','2023-04-17'],372:['142','250','2023-04-17'],373:['117','47','2023-04-17'],
    375:['116','246',''],376:['130','253','2023-04-17'],377:['132','243','2023-04-17'],
    378:['137','242','2023-04-17'],379:['136','237','2023-04-17'],380:['135','255','2023-04-17'],
    381:['138','240','2023-04-17'],382:['139','244','2023-04-17'],383:['129','248','2023-04-17'],
    384:['140','249','2023-04-17'],385:['134','354','2023-04-17'],386:['199','245','2023-04-17'],
    387:['118','239','']
  }],
  ['704-08','2023-05-19',[388,389,390],{388:['122','1336','2023-06-19'],389:['121','1335','2023-06-19'],390:['120','1333','2023-06-19']}],
  ['709-12','2023-05-19',[391],{391:['161','1608','2023-07-10']}],
  ['718-21','2023-05-20',[392],{392:['144','1392','']}],
  ['714-17','2023-05-20',[393],{393:['126','1334','2023-06-19']}],
  ['738-41','2023-06-21',[394],{394:['143','1391','2023-09-14']}],
  ['804-08','2023-07-21',[395],{395:['164','2171','2023-07-08']}],
  ['809-12','2023-07-21',[396],{396:['186','3095','2023-09-14']}],
  ['886-89','2023-07-10',[397],{397:['162','1639','2023-07-11']}],
  ['','2023-07-10',[398],{398:['163','1640','2023-07-11']}],
  ['876-78','2023-06-29',[399,400],{399:['146','1452',''],400:['145','1453','']}],
  ['','2023-07-13',[401,402,403],{401:['149','1480',''],402:['147','1481',''],403:['148','1482','']}],
  ['949-54','2023-08-04',[404],{404:['168','2245','2023-08-01']}],
  ['961-64','2023-06-14',[405],{405:['125','1300','']}],
  ['1081-86','2023-07-25',[406],{406:['165','2250','2023-08-01']}],
  ['1095-98','2023-07-13',[407],{407:['196','2460','2023-08-16']}],
  ['1091-94','2023-07-13',[408],{408:['169','2458','2023-08-16']}],
  ['1088-90','2023-07-13',[409],{409:['166','2459','2023-08-16']}],
  ['1139','2023-07-15',[410],{}],
  ['2113-18','2023-07-24',[411,412,413,414,417],{411:['150','2560',''],412:['155','2558',''],413:['156','2559',''],414:['157','2557',''],417:['158','2561','']}],
  ['2129-24','2023-07-24',[415],{415:['181','2590','']}],
  ['2125-31','2023-07-24',[416],{416:['173','2591','']}],
  ['1209-12','2023-07-24',[418],{418:['177','2603','']}],
  ['1220-25','2023-07-25',[419],{}],
  ['1226-30','2023-07-25',[420,421,422],{420:['170','2554',''],421:['160','2555',''],422:['159','2556','']}],
  ['1231-36','2023-07-25',[423,424,425],{423:['182','2588',''],424:['180','2589',''],425:['127','2837','2023-09-01']}],
  ['1237-41','2023-07-25',[426],{426:['171','2575','']}],
  ['1242-45','2023-07-26',[427,428,429],{427:['176','2594',''],428:['174','2595',''],429:['175','2593','']}],
  ['1264-67','2023-08-01',[430,431,432,433,434],{430:['178','2967','2023-09-11'],431:['179','2966','2023-09-11'],432:['183','2965','2023-09-11'],433:['185','2968','2023-09-11'],434:['184','2969','2023-09-11']}],
  ['2321','2023-11-20',[436,437],{436:['201','4957','2023-12-20'],437:['202','4958','2023-12-20']}],
];

export const SEED_GROUPS = [];
export const SEED_ORDERS = [];
export const SEED_CERTS = [];

ORDER_DATA.forEach(([orderNo, issueDate, cards, certData]) => {
  const key = `${orderNo}_${issueDate}_${cards.join('-')}`;
  const gid = mkGid(key);
  const oid = mkOid(key);

  // Get trainee IDs
  const traineeIds = cards.map(card => {
    const t = SEED_TRAINEES.find(x => x.cardNo === card);
    return t?.id;
  }).filter(Boolean);

  if (!traineeIds.length) return;

  SEED_GROUPS.push({
    id: gid,
    name: orderNo || `Order ${issueDate}`,
    traineeIds,
    chqRefs: [],
    createdAt: issueDate,
    orderRef: orderNo
  });

  SEED_ORDERS.push({
    id: oid,
    localOrderNo: orderNo || '',
    issueDate,
    groupId: gid,
    isGroup: true,
    rotation: {},
    createdAt: issueDate,
    historical: true
  });

  // Certs
  Object.entries(certData).forEach(([cardStr, [certNo, dispatchNo, certDate]]) => {
    if (!certNo && !dispatchNo) return;
    const card = parseInt(cardStr);
    const t = SEED_TRAINEES.find(x => x.cardNo === card);
    if (!t) return;
    SEED_CERTS.push({
      orderId: oid,
      cardNo: card,
      certNo: String(certNo || ''),
      dispatchNo: String(dispatchNo || ''),
      certDate: certDate || '',
      completionDate: ''
    });
  });
});
