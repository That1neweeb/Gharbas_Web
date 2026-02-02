const SequelizeMock = require("sequelize-mock");
// const { DESCRIBE } = require("sequelize/lib/query-types");
const dbMock = new SequelizeMock();

const UserMock = dbMock.define('Users',{
    // id:1,
    // customerName:"Sidhant",
    // customerAddress:"kathmandu",
    // customerEmail:"abcd@gmail.com",
    // phone:9842361826,
    // customerPassword:"Thatoneweeb123",
    // dob:"2006-3-3",
  
});

describe('User Model', () => {
    it('should create a user', async () => {
        const user = await UserMock.create({
            
            customerName:"Sidhant",
            customerAddress:"kathmandu",
            customerEmail:"abcd@gmail.com",
            phone:'9842361826',
            customerPassword:"Thatoneweeb123",
            dob:"2006-3-3",
        });
        

        expect(user.customerName).toBe('Sidhant');
        expect(user.customerAddress).toBe('kathmandu');
        expect(user.customerEmail).toBe('abcd@gmail.com');
        expect(user.phone).toBe('9842361826');
        expect(user.dob).toBe('2006-3-3');
        expect(user.customerPassword).toBe('Thatoneweeb123');
    });

    it('should require a user ', async () => {
        await expect(UserMock.create({})).rejects.toThrow("Data is required"); 
    });
});

// 