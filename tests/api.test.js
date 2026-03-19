const axios = require('axios');

// ==================== CONFIGURATION ====================
const BASE_URL = 'https://devsfit.vvdntech.com/api-node/testcases';

const COMMON_HEADERS = {
    "Content-Type": "application/json",
    "Accept": "application/json"
};

// Configure axios defaults
axios.defaults.validateStatus = function (status) {
    return status >= 200 && status < 600; // Don't throw on any status
};

// ==================== TEST SUITE ====================
describe('API Test Suite', () => {

    test('TC001 - Successful retrieval of test cases with valid userId and projectId', async () => {
            const url = `${BASE_URL}${endpoint}`;
            const params = query_params;
            const headers = { ...COMMON_HEADERS };

            const response = await axios.get(url, { params, headers, validateStatus: true });

            expect(response.status).toBe(expected_status);

            if (expected_response) {
                expect(response.data).toEqual(expected_response);
            }
        });

    test('TC002 - Missing userId - Validation Error', async () => {
            const url = `${BASE_URL}${endpoint}`;
            const headers = { ...COMMON_HEADERS };

            const params = query_params;

            const response = await axios.get(url, {
                headers,
                validateStatus: (status) => true
            });

            expect(response.status).toBe(expected_status);

            if (expected_response) {
                expect(response.data).toEqual(expected_response);
            }
        });

    test('TC003 - Missing projectId - Validation Error', async () => {
            const url = `${BASE_URL}${'/testcases/getTestCasesBasedOnProject'}`;
            const headers = { ...COMMON_HEADERS };

            const response = await axios.get(url, { headers, validateStatus: true });

            expect(response.status).toBe(400);
            expect(response.data.success).toBe(false);
            expect(response.data.message).toBe('Missing query params: projectId, userId');
        });

    test('TC004 - Missing both userId and projectId - Validation Error', async () => {
            const url = `${BASE_URL}${endpoint}`;
            const headers = { ...COMMON_HEADERS };

            try {
                const response = await axios.get(url, { headers, validateStatus: true });
                expect(response.status).toBe(expected_status);
                expect(response.data).toEqual(expected_response);
            } catch (error) {
                expect(error.response.status).toBe(expected_status);
                expect(error.response.data).toEqual(expected_response);
            }
        });

    test('TC005 - Internal Server Error', async () => {
            const url = `${BASE_URL}${endpoint}`;
            const params = { ...query_params };

            try {
                const response = await axios.get(url, {
                    headers: { ...COMMON_HEADERS },
                    validateStatus: (status) => true
                }, { params });

                expect(response.status).toBe(expected_status);
                expect(response.data).toEqual(expected_response);
            } catch (error) {
                expect(error.response?.status).toBe(expected_status);
                expect(error.response?.data).toEqual(expected_response);
            }
        });

});
