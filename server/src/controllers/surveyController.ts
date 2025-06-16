import { Request, Response, NextFunction } from 'express';
import { db } from '../db/index.js';
import { responses, SurveyAnswers } from '../db/schema.js';
import { surveyResponseSchema, getSurveyConfig } from '../validation/surveyValidation.js';

export const fetchSurveyConfig = (req: Request, res: Response) => {
  const config = getSurveyConfig();
  res.json(config);
};

export const submitSurveyResponse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = await surveyResponseSchema.validateAsync(req.body, { abortEarly: false });

    await db.insert(responses).values({ answers: validatedData as SurveyAnswers });

    res.status(201).json({ message: 'Response saved successfully' });
  } catch (error: any) {
    if (error.isJoi) {
        return res.status(400).json({
            message: "Validation failed",
            errors: error.details.map((detail: any) => ({
                field: detail.path.join('.'),
                message: detail.message,
            }))
        });
    }
    next(error);
  }
};
