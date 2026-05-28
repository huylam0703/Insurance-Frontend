import axiosClient from '../api/axiosClient';

function unwrap(data) {
  if (data == null) return data;
  if (Object.prototype.hasOwnProperty.call(data, 'result')) {
    return data.result;
  }
  return data;
}

export async function purchaseContract(requestData, vehicleImage) {
  const formData = new FormData();

  formData.append(
    'request',
    new Blob([JSON.stringify(requestData)], { type: 'application/json' })
  );

  if (vehicleImage) {
    formData.append('vehicleImage', vehicleImage);
  }

  const response = await axiosClient.post('/contracts/purchase', formData, {
    headers: {
      'Content-Type': false,
    },
  });

  return unwrap(response.data);
}
