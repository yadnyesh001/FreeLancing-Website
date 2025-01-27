


export const createPayment = async (req, res) => {
  try {
    const { contractId } = req.params;
    const { amount, paymentDate } = req.body;

    const contract = await Contract.findById(contractId);
    if (!contract) {
      return res.status(404).json({ message: 'Contract not found' });
    }

    const payment = new Payment({
      amount,
      paymentDate,
      contract: contractId,
    }); 

    await payment.save();
    contract.payments.push(payment);
    await contract.save();

    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  } 
}

export const listPayments = async (req, res) => {
  try {
    const { contractId } = req.params;

    const contract = await Contract.findById(contractId).populate('payments');
    if (!contract) {
      return res.status(404).json({ message: 'Contract not found' });
    }

    res.status(200).json(contract.payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getPaymentDetails = async (req, res) => {
  try {
    const { paymentId } = req.params;

    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
