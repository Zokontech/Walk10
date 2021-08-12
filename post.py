import requests
data={
    "name":"Zander Krasny",
    "phone":"321-258-3034",
    "email":"elekid18@gmail.com",
    "address":"2240 Abalone Ave Indialantic, FL 32903",
    "birthday":"1999-05-24",
}
data2={
    "patientid": 1,
    "distance":6,
    "slow1":4.5,
    "slow2":4.5,
    "fast1":4.5,
    "fast2":4.5,
    "slowspeed":3.6,
    "fastspeed":4.7,
    "assistlevel":5,
    "time":"2021-08-10 11:00:00",


}
#print(data2)
#t=requests.post("http://localhost:5000/patients", data=data)
#t=requests.post("http://localhost:5000/trials", data=data2)
t=requests.get("http://localhost:5000/trials/1")
print(t.text)