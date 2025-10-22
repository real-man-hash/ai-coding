import "server-only";

import { genSaltSync, hashSync } from "bcrypt-ts";
import { desc, eq, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

import { user, chat, User, reservation, Chat, Reservation } from "./schema";

// Create a connection pool
const pool = mysql.createPool({
  uri: process.env.DATABASE_URL,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const db = drizzle(pool);

export async function getUser(email: string): Promise<User[]> {
  try {
    const result = await db.select().from(user).where(eq(user.email, email));
    return result || [];
  } catch (error) {
    console.error("Failed to get user from database", error);
    return [];
  }
}

export async function createUser(email: string, password: string): Promise<User> {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    
    // First insert the user
    await db.insert(user).values({ 
      email, 
      password: hash,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    // Then fetch the newly created user
    const [newUser] = await db.select()
      .from(user)
      .where(eq(user.email, email))
      .limit(1);
    
    await connection.commit();
    
    if (!newUser) {
      throw new Error('Failed to retrieve created user');
    }
    
    return newUser;
  } catch (error) {
    await connection.rollback();
    console.error("Failed to create user in database", error);
    throw error;
  } finally {
    connection.release();
  }
}

export async function saveChat({
  id,
  messages,
  userId,
}: {
  id: string;
  messages: any;
  userId: string;
}): Promise<Chat> {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    
    const existingChat = await db
      .select()
      .from(chat)
      .where(eq(chat.id, id));

    let result;
    if (existingChat.length > 0) {
      [result] = await db
        .update(chat)
        .set({ 
          messages: JSON.stringify(messages),
          updatedAt: new Date()
        })
        .where(eq(chat.id, id));
    } else {
      [result] = await db.insert(chat).values({
        id,
        messages: JSON.stringify(messages),
        userId,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    
    await connection.commit();
    
    // Fetch the saved chat to return
    const [savedChat] = await db.select()
      .from(chat)
      .where(eq(chat.id, id))
      .limit(1);
      
    return savedChat;
  } catch (error) {
    await connection.rollback();
    console.error("Failed to save chat to database", error);
    throw error;
  } finally {
    connection.release();
  }
}

export async function deleteChatById({ id }: { id: string }): Promise<void> {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    await db.delete(chat).where(eq(chat.id, id));
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    console.error("Failed to delete chat from database", error);
    throw error;
  } finally {
    connection.release();
  }
}

export async function getChatsByUserId({ id }: { id: string }): Promise<Chat[]> {
  try {
    return await db
      .select()
      .from(chat)
      .where(eq(chat.userId, id))
      .orderBy(desc(chat.createdAt));
  } catch (error) {
    console.error("Failed to get chats from database", error);
    throw error;
  }
}

export async function getChatById({ id }: { id: string }): Promise<Chat | undefined> {
  try {
    const [result] = await db
      .select()
      .from(chat)
      .where(eq(chat.id, id))
      .limit(1);
    return result;
  } catch (error) {
    console.error("Failed to get chat from database", error);
    throw error;
  }
}

export async function createReservation({
  id,
  userId,
  details,
}: {
  id: string;
  userId: string;
  details: any;
}): Promise<Reservation> {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    
    await db.insert(reservation).values({
      id,
      userId,
      details: JSON.stringify(details),
      createdAt: new Date(),
      updatedAt: new Date(),
      hasCompletedPayment: false
    });
    
    await connection.commit();
    
    // Fetch the created reservation to return
    const [newReservation] = await db
      .select()
      .from(reservation)
      .where(eq(reservation.id, id))
      .limit(1);
      
    return newReservation;
  } catch (error) {
    await connection.rollback();
    console.error("Failed to create reservation in database", error);
    throw error;
  } finally {
    connection.release();
  }
}

export async function getReservationById({ id }: { id: string }): Promise<Reservation | undefined> {
  try {
    const [selectedReservation] = await db
      .select()
      .from(reservation)
      .where(eq(reservation.id, id));

    return selectedReservation;
  } catch (error) {
    console.error("Failed to get reservation from database", error);
    throw error;
  }
}

export async function updateReservation({
  id,
  hasCompletedPayment,
}: {
  id: string;
  hasCompletedPayment: boolean;
}): Promise<Reservation> {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    
    await db
      .update(reservation)
      .set({ 
        hasCompletedPayment,
        updatedAt: new Date()
      })
      .where(eq(reservation.id, id));
      
    await connection.commit();
    
    // Fetch the updated reservation to return
    const [updatedReservation] = await db
      .select()
      .from(reservation)
      .where(eq(reservation.id, id))
      .limit(1);
      
    return updatedReservation;
  } catch (error) {
    await connection.rollback();
    console.error("Failed to update reservation in database", error);
    throw error;
  } finally {
    connection.release();
  }
}
