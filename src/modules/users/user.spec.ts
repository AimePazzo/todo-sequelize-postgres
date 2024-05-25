import chai,{ expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../index';

chai.use(chaiHttp);

const router = () => chai.request(app)
describe('User Controller', () => {
    describe('POST /signup', () => {
        it('should create a user and return status 200',  (done) => {

            router()
                .post('/api/user/signup')
                .send({ username: 'JohnDoe', email: 'john.doe@example.com', password: 'password123' })
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    done(err);
                })
        });

        it('should return 404 when user is not created',  (done) => {
            router()
                .post('/signup')
                .send({ username: 'JohnDoe', email: 'john.doe@example.com', password: 'password123' })
                .end((err, res) => {
                    expect(res.status).to.equal(404);
                    done(err);
                })

        });
    });

    describe('GET /', () => {
        it('should return users and status 200',  (done) => {
            router()
            .get('/api/user/')
            .end((err,res)=>{
                expect(res.status).to.equal(200);
                done(err)
            })
        });
    });
});
