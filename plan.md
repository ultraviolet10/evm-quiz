# EVM Quiz Daily App - Implementation Plan

## Project Overview

A daily EVM quiz application built as a Farcaster mini app, featuring 10 questions per day with difficulty progression (easy→medium→hard), social leaderboards with mutual Farcaster friends, and sharing capabilities. The app uses a "Wordle-like" model where all users get the same questions each day.

## Quick Start for New Implementation Session

### Immediate Next Steps
1. **Install New Dependencies**: Run the dependency installation commands below
2. **Set up Supabase**: Create project and get credentials
3. **Configure Environment**: Create `.env.local` with required variables (see template below)
4. **Initialize Database**: Set up Supabase locally and run migrations
5. **Start Implementation**: Begin with Phase 1, Step 1 (Database Setup)

### Current Codebase Assessment
**✅ Already Implemented:**
- Next.js 15 + TypeScript setup with App Router
- Tailwind CSS with custom pixel art styling (`.pixel-text`, `.pixel-card`, `.pixel-border` classes)
- Neynar React integration (`@neynar/react: ^1.2.8`)
- Basic UI components (`Button`, `HomePage`)
- EVM opcode data structure (`src/lib/evmData.ts` - 77 opcodes with categories)
- Existing quiz game component (`src/components/OpcodeQuizGame.tsx` - scoring, streaks, 10 questions)
- Game routing (`src/app/game-modes/page.tsx`, `src/app/opcode-quiz/page.tsx`)

**🔄 Needs Refactoring/Extension:**
- `OpcodeQuizGame.tsx`: Convert from random quiz to daily quiz system
- `evmData.ts`: Extend with more comprehensive question types and metadata
- Add authentication system (currently no user system)
- Replace local state with database persistence

**➕ To Be Created:**
- Database layer (Supabase integration)
- API routes for daily quiz system
- User authentication with Neynar SIWN
- Social features and leaderboards
- Question generation service

## Dependencies to Install

### New Production Dependencies
```bash
npm install @supabase/supabase-js@^2.39.0
npm install @neynar/nodejs-sdk@^1.55.0
npm install date-fns@^3.6.0
npm install seedrandom@^3.0.5
npm install @types/seedrandom@^3.0.8
npm install jose@^5.2.0
```

### New Development Dependencies
```bash
npm install --save-dev supabase@^1.142.0
npm install --save-dev @supabase/cli@^1.142.0
```

### Verify Existing Dependencies
Your current package.json already includes:
- ✅ `@neynar/react: ^1.2.8` (keep for UI components)
- ✅ `next: 15.1.3`
- ✅ `react: 19.0.0` & `react-dom: 19.0.0`
- ✅ `typescript: ^5`
- ✅ `tailwindcss: ^3.4.1`

## Environment Variables Template

Create `.env.local` file:
```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Neynar Configuration
NEYNAR_API_KEY=your-neynar-api-key
NEYNAR_CLIENT_ID=your-client-id

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# Optional: For production
VERCEL_URL=your-production-url.vercel.app
```

## File Creation Checklist

### Phase 1 Files to Create:
```
src/lib/database/
├── supabase.ts                 # Supabase client setup
├── types.ts                    # Database type definitions
└── queries.ts                  # Common database queries

src/lib/auth/
├── neynar-auth.ts             # Neynar authentication service
└── session.ts                 # Session management

src/app/api/
├── auth/
│   ├── login/route.ts
│   └── logout/route.ts
├── daily-quiz/route.ts
└── submit-quiz/route.ts

supabase/
├── config.toml
├── migrations/
│   └── 001_initial_schema.sql
└── seed.sql
```

## Troubleshooting Common Issues

### Supabase Setup Issues
- **Local setup fails**: Ensure Docker is running for `supabase start`
- **Connection errors**: Verify `.env.local` has correct Supabase URL and keys
- **Migration errors**: Check SQL syntax and run `supabase db reset` if needed

### Neynar Integration Issues  
- **API key invalid**: Verify key is active at [neynar.com](https://neynar.com)
- **CORS errors**: Ensure your domain is registered in Neynar dashboard
- **Rate limits**: Check API usage in Neynar dashboard

### Next.js Issues
- **Import errors**: Ensure all new dependencies are installed
- **Type errors**: Run `npm run build` to check TypeScript compilation
- **Environment variables**: Restart dev server after changing `.env.local`

## Implementation Order Priority

Follow this exact order for smooth implementation:

1. **Database Foundation** (Critical first)
   - Set up Supabase project
   - Create database schema
   - Test connection

2. **Authentication Layer** (Required for all features)
   - Implement Neynar SIWN
   - Create user management
   - Set up session handling

3. **Daily Quiz API** (Core functionality)
   - Quiz generation service
   - Question serving endpoints
   - Answer submission handling

4. **Frontend Integration** (User experience)
   - Refactor existing components
   - Implement daily quiz flow
   - Add authentication UI

5. **Social Features** (Enhancement)
   - Friend system integration
   - Leaderboards
   - Sharing functionality

## Technical Architecture

### Monorepo Structure
```
evm-quiz/
├── src/
│   ├── app/                    # Next.js 15 App Router
│   │   ├── api/               # Backend API routes
│   │   │   ├── daily-quiz/    # Quiz generation & fetching
│   │   │   ├── submit-quiz/   # Quiz submission & scoring
│   │   │   ├── leaderboard/   # Friend leaderboards
│   │   │   ├── auth/          # Farcaster authentication
│   │   │   └── share/         # Social sharing endpoints
│   │   ├── quiz/              # Quiz gameplay pages
│   │   ├── leaderboard/       # Leaderboard pages
│   │   └── settings/          # User settings
│   ├── components/
│   │   ├── quiz/              # Quiz-specific components
│   │   ├── ui/                # Reusable UI components
│   │   └── layout/            # Layout components
│   ├── lib/
│   │   ├── database/          # Supabase client & queries
│   │   ├── neynar/           # Neynar API integration
│   │   ├── quiz/             # Quiz logic & generation
│   │   ├── auth/             # Authentication helpers
│   │   └── utils/            # Utility functions
│   ├── types/                 # TypeScript type definitions
│   └── hooks/                 # Custom React hooks
├── supabase/
│   ├── migrations/            # Database migrations
│   └── types.ts              # Generated Supabase types
├── public/                    # Static assets
└── docs/                     # Documentation
```

### Tech Stack
- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Sign in with Neynar (SIWN)
- **Farcaster Integration**: Neynar SDK (@neynar/nodejs-sdk)
- **Deployment**: Vercel
- **Styling**: Existing pixel art theme with Tailwind

## Database Schema

### Core Tables

```sql
-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    fid INTEGER UNIQUE NOT NULL,
    username TEXT,
    display_name TEXT,
    pfp_url TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Daily quizzes table
CREATE TABLE daily_quizzes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quiz_date DATE UNIQUE NOT NULL,
    questions JSONB NOT NULL, -- Array of question objects
    seed TEXT NOT NULL, -- Date-based seed for reproducibility
    difficulty_progression TEXT[] NOT NULL, -- ['easy', 'easy', 'easy', 'medium', ...]
    created_at TIMESTAMP DEFAULT NOW()
);

-- Questions pool table
CREATE TABLE questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    opcode_name TEXT NOT NULL,
    category TEXT NOT NULL,
    difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
    question_type TEXT NOT NULL CHECK (question_type IN ('value', 'hex', 'description', 'gas', 'category', 'inputs_outputs')),
    question_text TEXT NOT NULL,
    correct_answer TEXT NOT NULL,
    options JSONB NOT NULL, -- Array of 4 options
    explanation TEXT,
    metadata JSONB, -- Additional opcode info (gas, inputs, outputs, etc.)
    created_at TIMESTAMP DEFAULT NOW()
);

-- User attempts table (cleared daily)
CREATE TABLE user_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    quiz_id UUID REFERENCES daily_quizzes(id) ON DELETE CASCADE,
    answers JSONB NOT NULL, -- Array of user's answers
    score INTEGER NOT NULL CHECK (score >= 0 AND score <= 10),
    completion_time_seconds INTEGER NOT NULL,
    submitted_at TIMESTAMP DEFAULT NOW(),
    
    UNIQUE(user_id, quiz_id) -- One attempt per user per day
);

-- Friend relationships cache (updated periodically)
CREATE TABLE friend_relationships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_fid INTEGER NOT NULL,
    friend_fid INTEGER NOT NULL,
    relationship_type TEXT NOT NULL DEFAULT 'mutual_follow',
    last_verified TIMESTAMP DEFAULT NOW(),
    
    UNIQUE(user_fid, friend_fid)
);

-- Indexes for performance
CREATE INDEX idx_user_attempts_quiz_date ON user_attempts(quiz_id);
CREATE INDEX idx_user_attempts_user_score ON user_attempts(user_id, score DESC);
CREATE INDEX idx_friend_relationships_user ON friend_relationships(user_fid);
CREATE INDEX idx_daily_quizzes_date ON daily_quizzes(quiz_date DESC);
```

### Question Categories & Difficulty Distribution
```typescript
const DIFFICULTY_DISTRIBUTION = {
  easy: 3,    // Questions 1-3
  medium: 4,  // Questions 4-7  
  hard: 3     // Questions 8-10
};

const CATEGORY_WEIGHTS = {
  'arithmetic': 0.15,
  'stack': 0.15, 
  'memory': 0.12,
  'storage': 0.12,
  'comparison': 0.10,
  'environment': 0.10,
  'blockinfo': 0.08,
  'bitwise': 0.08,
  'flow': 0.06,
  'system': 0.04
};
```

## API Endpoints Specification

### Authentication
```typescript
// POST /api/auth/login
interface LoginRequest {
  signerUuid: string;
  fid: number;
}
interface LoginResponse {
  user: User;
  sessionToken: string;
}

// POST /api/auth/logout
interface LogoutResponse {
  success: boolean;
}
```

### Daily Quiz
```typescript
// GET /api/daily-quiz?date=YYYY-MM-DD (optional, defaults to today)
interface DailyQuizResponse {
  quizId: string;
  date: string;
  questions: QuizQuestion[];
  hasAttempted: boolean;
  timeLimit: number; // seconds per question
}

interface QuizQuestion {
  id: string;
  questionText: string;
  options: string[];
  metadata: {
    category: string;
    difficulty: 'easy' | 'medium' | 'hard';
    opcodeName: string;
  };
}

// POST /api/submit-quiz
interface SubmitQuizRequest {
  quizId: string;
  answers: string[];
  completionTimeSeconds: number;
}

interface SubmitQuizResponse {
  score: number;
  totalQuestions: number;
  completionTime: number;
  results: QuestionResult[];
  leaderboardPosition?: number;
}

interface QuestionResult {
  questionId: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  explanation: string;
  opcodeInfo: OpcodeMetadata;
}
```

### Leaderboard
```typescript
// GET /api/leaderboard?date=YYYY-MM-DD (optional)
interface LeaderboardResponse {
  userScore: UserScore;
  friendScores: UserScore[];
  totalFriendsPlayed: number;
  userRank: number;
}

interface UserScore {
  fid: number;
  username: string;
  displayName: string;
  pfpUrl: string;
  score: number;
  completionTime: number;
  submittedAt: string;
}
```

### Social Features
```typescript
// GET /api/friends/mutual?fid=123
interface MutualFriendsResponse {
  friends: FarcasterUser[];
  totalCount: number;
}

// POST /api/share/generate
interface ShareRequest {
  type: 'farcaster' | 'twitter';
  score: number;
  totalQuestions: number;
}

interface ShareResponse {
  message: string;
  url?: string; // For cast or tweet
}
```

## Core Implementation Components

### 1. Daily Quiz Generation Service

```typescript
// src/lib/quiz/daily-generator.ts
export class DailyQuizGenerator {
  private supabase: SupabaseClient;
  private questionPool: Question[];

  async generateDailyQuiz(date: Date): Promise<DailyQuiz> {
    const seed = this.generateDateSeed(date);
    const rng = new SeededRandom(seed);
    
    // Get questions with balanced distribution
    const questions = await this.selectQuestions(rng, {
      difficulties: ['easy', 'easy', 'easy', 'medium', 'medium', 'medium', 'medium', 'hard', 'hard', 'hard'],
      maxSameCategory: 2,
      minCategoryVariety: 6
    });

    return {
      date,
      questions,
      seed,
      difficultyProgression: questions.map(q => q.difficulty)
    };
  }

  private async selectQuestions(rng: SeededRandom, constraints: QuizConstraints): Promise<Question[]> {
    // Implementation of smart question selection with constraints
    // Ensures good variety while maintaining randomness
  }

  private generateDateSeed(date: Date): string {
    return `evm-quiz-${date.toISOString().split('T')[0]}`;
  }
}
```

### 2. Authentication Service

```typescript
// src/lib/auth/neynar-auth.ts
export class NeynarAuthService {
  private neynarClient: NeynarAPIClient;

  async validateUser(signerUuid: string, fid: number): Promise<User> {
    const userInfo = await this.neynarClient.lookupUserByFid(fid);
    
    // Upsert user in database
    const user = await this.supabase
      .from('users')
      .upsert({
        fid: userInfo.fid,
        username: userInfo.username,
        display_name: userInfo.displayName,
        pfp_url: userInfo.pfp.url
      })
      .select()
      .single();

    return user;
  }

  async getMutualFollows(userFid: number): Promise<FarcasterUser[]> {
    // Use Neynar to fetch mutual follows
    // Cache in friend_relationships table
  }
}
```

### 3. Leaderboard Service

```typescript
// src/lib/leaderboard/service.ts
export class LeaderboardService {
  async getDailyLeaderboard(userFid: number, date: Date): Promise<LeaderboardResponse> {
    // Get user's friends who played today
    const friendFids = await this.getFriendFids(userFid);
    
    // Get scores for user and friends
    const scores = await this.getScoresForDate(date, [userFid, ...friendFids]);
    
    // Calculate rankings
    return this.formatLeaderboardResponse(scores, userFid);
  }

  private async getFriendFids(userFid: number): Promise<number[]> {
    // Check cache first, refresh if stale
    const cached = await this.getCachedFriends(userFid);
    if (this.isCacheStale(cached)) {
      await this.refreshFriendCache(userFid);
    }
    
    return cached.map(f => f.friend_fid);
  }
}
```

## Implementation Phases

### Phase 1: Core Infrastructure (Week 1)
1. **Database Setup**
   - Set up Supabase project
   - Create tables with migrations
   - Set up Row Level Security (RLS) policies
   - Add sample EVM questions to questions pool

2. **Authentication Foundation**
   - Implement Neynar SIWN integration
   - Create user management API routes
   - Set up session handling with JWT

3. **Basic Quiz API**
   - Daily quiz generation endpoint
   - Question serving (without answers)
   - Quiz submission and scoring
   - Basic validation and error handling

### Phase 2: Quiz Gameplay (Week 2)
1. **Frontend Quiz Experience**
   - Refactor existing OpcodeQuizGame component
   - Implement daily quiz fetching
   - Add timer functionality
   - Create results screen with detailed feedback

2. **Question Pool Enhancement**
   - Expand EVM question database
   - Implement question categorization
   - Add metadata (explanations, opcode details)
   - Create question validation system

3. **Daily Reset Logic**
   - Implement quiz generation cron job
   - Add user attempt cleanup (daily reset)
   - Create quiz history archival system

### Phase 3: Social Features (Week 3)
1. **Friend System Integration**
   - Implement Neynar mutual follows fetching
   - Create friend relationship caching
   - Build friend discovery UI

2. **Leaderboard Implementation**
   - Daily leaderboard API and UI
   - Friend performance comparison
   - Ranking and statistics display

3. **Sharing Features**
   - Generate shareable results
   - Farcaster cast integration
   - Twitter/X sharing functionality

### Phase 4: Polish & Optimization (Week 4)
1. **Performance Optimization**
   - Implement Redis caching for frequent queries
   - Optimize database queries with proper indexing
   - Add CDN for static assets

2. **UX Enhancements**
   - Improve loading states and transitions
   - Add achievement system
   - Implement progress tracking
   - Mobile responsiveness testing

3. **Error Handling & Monitoring**
   - Comprehensive error boundaries
   - API rate limiting
   - Performance monitoring setup
   - User feedback collection

## Deployment Plan

### Development Setup
```bash
# Local development environment
1. Clone repo and install dependencies
   npm install

2. Set up Supabase local development
   npx supabase init
   npx supabase start
   npx supabase db reset

3. Configure environment variables
   cp .env.example .env.local
   # Add Supabase, Neynar API keys

4. Run development server
   npm run dev

5. Database migrations
   npx supabase db push
   npm run db:seed # Populate with sample questions
```

### Production Deployment

#### Supabase Setup
1. **Create Supabase Project**
   - Set up production database
   - Configure RLS policies
   - Set up database backups
   - Generate API keys

2. **Database Migrations**
   ```bash
   npx supabase db push --db-url $DATABASE_URL
   npm run db:seed:production
   ```

#### Vercel Deployment
1. **Environment Configuration**
   ```bash
   # Production environment variables
   NEXT_PUBLIC_SUPABASE_URL=https://xyz.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   SUPABASE_SERVICE_ROLE_KEY=eyJ...
   NEYNAR_API_KEY=your_neynar_key
   NEYNAR_CLIENT_ID=your_client_id
   NEXTAUTH_SECRET=generated_secret
   NEXTAUTH_URL=https://your-app.vercel.app
   ```

2. **Vercel Configuration**
   ```json
   // vercel.json
   {
     "functions": {
       "src/app/api/**/*.ts": {
         "maxDuration": 30
       }
     },
     "crons": [
       {
         "path": "/api/cron/daily-quiz",
         "schedule": "0 0 * * *"
       },
       {
         "path": "/api/cron/cleanup",
         "schedule": "0 1 * * *"
       }
     ]
   }
   ```

3. **Deployment Commands**
   ```bash
   # Connect to Vercel
   npx vercel login
   npx vercel link

   # Deploy
   npx vercel --prod

   # Set up domain and SSL
   npx vercel domains add your-domain.com
   ```

#### Monitoring & Maintenance
1. **Health Checks**
   - API endpoint monitoring
   - Database connection health
   - Daily quiz generation verification

2. **Backup Strategy**
   - Supabase automatic backups
   - Question pool export/import scripts
   - User data backup procedures

3. **Performance Monitoring**
   - Vercel Analytics integration
   - API response time tracking
   - Database query performance

## Data Management

### Daily Cleanup Process
```typescript
// Cron job runs daily at 1 AM UTC
// src/app/api/cron/cleanup/route.ts
export async function GET() {
  // Clear previous day's user attempts
  await supabase
    .from('user_attempts')
    .delete()
    .lt('submitted_at', yesterday);

  // Refresh friend relationship cache for active users
  await refreshStaleFreindshipCache();

  // Generate next day's quiz
  await generateDailyQuiz(tomorrow);

  return Response.json({ success: true });
}
```

### Question Pool Management
- Start with expanded version of existing `src/lib/evmData.ts`
- Add comprehensive opcode coverage from evm.codes
- Include metadata for better educational value
- Create admin interface for question management (future phase)

## Security Considerations

1. **API Security**
   - Rate limiting on all endpoints
   - Input validation and sanitization
   - CORS configuration for mini app
   - SQL injection prevention via Supabase

2. **Authentication Security**
   - Neynar signature verification
   - Session token expiration
   - Secure cookie handling
   - CSRF protection

3. **Data Privacy**
   - Minimal data collection
   - Daily data cleanup
   - User data encryption at rest
   - GDPR compliance considerations

## Performance Optimization

1. **Caching Strategy**
   - Static quiz questions caching
   - Friend relationships caching
   - Leaderboard data caching
   - CDN for static assets

2. **Database Optimization**
   - Proper indexing strategy
   - Query optimization
   - Connection pooling
   - Read replicas for heavy queries

3. **Frontend Optimization**
   - Component lazy loading
   - Image optimization
   - Bundle size optimization
   - Service worker for offline support

## Future Enhancements

### Subscription Model (Later Phase)
- Payment integration (Stripe or Hypersub)
- Daily notification system via Neynar
- Premium feature gating
- Subscription management interface

### Advanced Features
- Question difficulty adaptation based on performance
- Achievement and badge system  
- Weekly/monthly leaderboards
- Custom quiz modes
- Educational content integration

## Success Metrics

1. **User Engagement**
   - Daily active users
   - Quiz completion rate
   - Return user rate
   - Average session duration

2. **Social Features**
   - Friend connections made
   - Leaderboard participation rate
   - Share action completion rate

3. **Educational Impact**
   - Score improvement over time
   - Category-wise performance analysis
   - Knowledge retention metrics

This implementation plan provides a comprehensive roadmap for building the EVM Quiz daily app with all requested features, proper architecture, and deployment considerations. Each phase builds upon the previous one, ensuring a stable and scalable final product.