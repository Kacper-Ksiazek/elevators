export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1', // Adjust this if your src directory has a different structure
        '^@Elevator/(.*)$': '<rootDir>/src/tools/elevator_system/$1', // Adjust this if your src directory has a different structure
    },
};
