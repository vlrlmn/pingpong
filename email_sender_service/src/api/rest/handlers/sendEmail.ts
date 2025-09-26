import { FastifyRequest, FastifyReply } from 'fastify'
import EmailSendRequest from '../../../pkg/emailSendRequest/emailSendRequest';
import EmailQueue from '../../../pkg/emailQueue/emailQueue';

export default async function sendEmail(request: FastifyRequest, reply: FastifyReply) {

  // Check if the request is valid
  const emailRequest:EmailSendRequest = new EmailSendRequest(request.body)
  const dataIsValid = emailRequest.validate()
  if (!dataIsValid) {
    return reply.status(400).send({ error: 'Invalid input data' });
  }

  // Try to add the email request to the queue
  try {
    EmailQueue.add(emailRequest)
  }
  catch (error) {
    if (error instanceof Error && error.message.includes("TemplateStorage")) {
      return reply.status(404).send({ error: 'Not found' });
    }
    return reply.status(500).send({ error: 'Internal server error' });
  }

  // If adding finished successfully, return a success message
  return reply
    .status(202)
    .send({ message: 'Email sent successfully' });
}
