# Chat App Supabase



**Schema:** `sql/chat-app.sql`

This migration sets up a comprehensive chat application schema in a custom `chat_app` schema (not the default `public`). It implements a Slack-like chat app with robust table structures, authentication, authorization, and realtime capabilities.

---

## Schema Overview

The migration creates a `chat_app` schema with the following components:

### Custom Types

- **`app_permission`**: Enum for granular permissions (`channels.delete`, `messages.delete`)
- **`app_role`**: Enum for user roles (`admin`, `moderator`)
- **`user_status`**: Enum for tracking user status (`ONLINE`, `OFFLINE`)

### Tables

- **`users`**

  - Links to Supabase Auth users via UUID
  - Stores username and online status
  - Primary user profile data

- **`channels`**

  - Chat topics/rooms for messages
  - Contains slug (URL-friendly name) and creator reference

- **`messages`**

  - Individual chat messages
  - Associated with specific channels and users
  - Includes timestamps

- **`user_roles`**

  - Role assignments (admin, moderator) for users
  - Implements role-based access control

- **`role_permissions`**
  - Maps permissions to roles
  - Defines allowed actions per role

### Security Features

- Row-Level Security (RLS) enabled on all tables
- Custom policies for insert, update, select, and delete
- Role-based authorization via the `authorize` function
- Schema privileges for Supabase roles (`anon`, `authenticated`, `service_role`)

### Realtime Support

- Configures Supabase realtime publication for chat tables
- Enables real-time updates for users, channels, and messages
- Sets replica identity to `full` for change tracking

### Special Features

- Automatic user provisioning via `handle_new_user` trigger
- Role assignment based on email patterns (`+supaadmin@`, `+supamod@`)
- Optimized queries with indexes on foreign keys and frequently queried columns
- Dummy data for initial testing and demonstration

---

## Usage Notes

- Based on Supabase's slack-clone example, adapted for a custom schema
- All types and functions are schema-qualified for isolation
- Requires Supabase Auth to be configured
- Supports multiple channels with access controls

This migration provides a foundation for chat functionality with strong security and performance, isolated in its own schema for better organization.
