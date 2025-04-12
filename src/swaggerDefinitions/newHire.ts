/**
 * @swagger
 * /api/new-hire/welcome:
 *   post:
 *     summary: Send a welcome email to a new hire
 *     tags: [NewHire]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Welcome message sent
 *       500:
 *         description: Server error
 */