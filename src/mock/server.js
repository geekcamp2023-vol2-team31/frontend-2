const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cors({
  credentials: true,
  origin: "http://localhost:3000"
}));

const port = 4000;

const log = (msg) => {
  console.log("DEBUG @mock:", msg);
};
// ↓ ダミーデータの宣言 ↓
let techs = [
  {
    tech: { name: "TypeScript" },
  },
  {
    tech: { name: "JavaScript" },
  },
  {
    tech: { name: "Java" },
  },
];

let teams = [
  {
    id: "1",
    invitationCode: "INVITATION_CODE_1",
    name: "team1",
  },
  {
    id: "2",
    invitationCode: "INVITATION_CODE_2",
    name: "team2",
  },
];

let user = {
  icon: undefined,
  id: "1",
  name: "Yamada Taro",
  bio: "Yamadaです。お願いします",
  userToTechs: [
    { ...techs[0], level: "beginner" },
    { ...techs[1], level: "expert" },
  ],
  teamsBelongs: [teams[0], teams[1]],
  teamsOwns: [teams[0]],
};

let user2 = {
  ...user,
  techs: [{ ...techs[2], level: "advanced" }],
};

const newTeam = { id: "3", name: "teamAdded", invitationCode: "CODE3" };

const uniqueId = (() => {
  let count = 10;
  return () => {
    count++;
    return count.toString();
  };
})();

/**
 * interface IComment {
 *   id: string;
 *   value: string;
 *   type: "problems" | "goals" | "solutions";
 * }
 */
let comments = [
  { id: "1", body: "コメント1", type: "problem" },
  { id: "2", body: "コメント2", type: "problem" },
  { id: "3", body: "コメント3", type: "goal" },
  { id: "4", body: "コメント4", type: "solution" },
  { id: "5", body: "コメント5", type: "solution" },
];

let products = [
  {
    id: "1",
    name: "プロダクト1",
    comments: [comments[3], comments[4]],
    techs: [techs[0]],
  },
];

let links = [
  { id: "1", leftCommentId: comments[0].id, rightCommentId: comments[4].id },
  { id: "2", leftCommentId: comments[1].id, rightCommentId: comments[4].id },
  { id: "3", leftCommentId: comments[2].id, rightCommentId: comments[3].id },
  { id: "4", leftCommentId: comments[3].id, rightCommentId: comments[5].id },
  { id: "5", leftCommentId: comments[3].id, rightCommentId: comments[6].id },
  { id: "6", leftCommentId: comments[4].id, rightCommentId: comments[7].id },
];
// ↑ ダミーデータの宣言 ↑

// POST /auth
app.post("/auth", (req, res) => {
  // tokenの有無に関わらず成功する
  const token = req.body.token;
  log(`token is ${token}`);
  res.send({
    type: "AuthResponse",
    status: "200",
    message: "login success",
    isFirstLogin: false,
  });
});

// DELETE /auth
app.delete("/auth", (req, res) => {
  res.send({ success: true });
});

// GET /users/me
// Response: IGetUsersMeResponse
app.get("/users/me", (req, res) => {
  res.send({ user });
});

// PUT /users/me
// Response: IGetUsersMeResponse
app.put("/users/me", (req, res) => {
  const { user: newUser } = req.body;
  user = {
    ...user,
    ...newUser,
  };
  res.send({ success: true });
});

// PUT /users/me/teams/:invitationCode]
app.put("/users/me/teams/:invitationCode", (req, res) => {
  user.teamsBelongs.push(newTeam);
  res.send({ team: newTeam });
});

// POST /teams
// Request: IPostTeamsBody
// Response: IPostTeamsResponse | UnauthorizedError
// ここでは常に成功する
app.post("/teams", (req, res) => {
  const { name } = req.body;
  const id = uniqueId();
  user.teamsOwns.push({ id, name });
  user.teamsBelongs.push({ id, name });
  teams.push({ id, name });
  res.send({
    team: {
      invitationCode: "INVITATION_CODE_DUMMY",
      id,
      name,
      techToUsers: [
        { tech: techs[0], user, level: "beginner" },
        { tech: techs[1], user: user2, level: "advanced" },
      ],
      owner: {
        icon: user.icon,
        id: user.id,
        name: user.name,
        bio: user.bio,
      },
      members: [
        {
          icon: user.icon,
          id: user.id,
          name: user.name,
          bio: user.bio,
        },
      ],
    },
  });
});

// GET /teams/:teamId
// Request: ITeamGetParams
// Response: ITeamGetResponse
app.get("/teams/:teamId", (req, res) => {
  const team = teams.find((t) => t.id === req.params.teamId);
  if (!team) {
    res.status(404).send();
    return;
  }
  // teamIdに関わらす１つ目を返す
  res.send({
    team: {
      ...team,
      invitationCode: "INVITATION_CODE_DUMMY",
      techToUsers: [
        { tech: techs[0], user, level: "beginner" },
        { tech: techs[1], user: user2, level: "advanced" },
      ],
      owner: {
        icon: user.icon,
        id: user.id,
        name: user.name,
        bio: user.bio,
      },
      members: [
        {
          icon: user.icon,
          id: user.id,
          name: user.name,
          bio: user.bio,
        },
      ],
    },
  });
});

// PUT /teams/:teamId
// Request: ITeamPutBody(実装時点で未定)
// Response: ITeamPutResponse(実装時点で未定)
app.put("/teams/:teamId", (req, res) => {
  const teamId = req.params.teamId;
  const { team } = req.body;
  teams = teams.map((t) => (t.id === teamId ? { ...t, ...team } : t));
  res.send({ success: true });
});

// DELETE /teams/:teamId
app.delete("/teams/:teamId", (req, res) => {
  const teamId = req.params.teamId;
  teams = teams.filter((t) => t.id !== teamId);
  user.owns = user.owns.filter((t) => t.id !== teamId);
  user.belongs = user.belongs.filter((t) => t.id !== teamId);
  res.send({ success: true });
});

// GET /teams/:teamId/comments
/**
 *  Response(暫定): {
 *    comments: {
 *      id: string;
 *      value: string;
 *      type: "problem" | "goal" | "solution";
 *    }[];
 *  }
 */
app.get("/teams/:teamId/comments", (req, res) => {
  res.send({ comments });
});

// POST /teams/:teamId/comments
/**
 *  Request(暫定): {
 *    comment: {
 *      content: string;
 *      value: string;
 *      type: "problem" | "goal" | "solution";
 *    };
 *  }
 */
app.post("/teams/:teamId/comments", (req, res) => {
  console.log(req);
  const {
    comment: { body, type },
  } = req.body;
  const newComment = { id: uniqueId(), body, type };
  comments.push(newComment);
  res.send(newComment);
});

// PUT /teams/:teamId/comments/:commentId
/**
 *  Request(暫定): {
 *    comment: {
 *      value: string;
 *    };
 *  }
 */
app.put("/teams/:teamId/comments/:commentId", (req, res) => {
  const commentId = req.params.commentId;
  comments = comments.map((c) =>
    c.id === commentId ? { ...c, content: req.body.comment.content } : c
  );
  res.send({ success: true });
});

// DELETE /teams/:teamId/comments/:commentId
app.delete("/teams/:teamId/comments/:commentId", (req, res) => {
  const commentId = req.params.commentId;
  comments = comments.filter((c) => c.id !== commentId);
  res.send({ success: true });
});

// GET /teams/:teamId/products
/**
 * Response(暫定): {
 *   products: {
 *     id: string;
 *     name: string;
 *     comments: Comment[];
 *     techs: { name: string; icon?: string }[]; // 使用技術
 *   };
 * }
 */
app.get("/teams/:teamId/products", (req, res) => {
  res.send({ products });
});

// POST /teams/:teamId/products
/**
 * Request(暫定): {
 *   product: {
 *     name: string;
 *     comments: Comment[];
 *   };
 * }
 */
app.post("/teams/:teamId/products", (req, res) => {
  const {
    product: { name, comments },
  } = req.body;
  const newProduct = {
    id: uniqueId(),
    name,
    comments,
    techs: [],
  };
  products.push(newProduct);
  res.send(newProduct);
});

// PUT /teams/:teamId/products/:productId
/**
 * Request(暫定): {
 *   product: {
 *     name: string;
 *     comments: Comment[];
 *     techs: { name: string; icon?: string; }[];
 *   };
 * }
 */
app.put("/teams/:teamId/products/:productId", (req, res) => {
  const productId = req.params.productId;
  const {
    product: { name, comments, techs },
  } = req.body;
  products = products.map((p) =>
    p.id === productId ? { ...p, name, comments, techs } : p
  );
  res.send({ success: true });
});

// GET /teams/:teamId/links
/**
 * Response(暫定): {
 *   links: {
 *     id: string;
 *     left: Comment;
 *     right: Comment;
 *   }[];
 * }
 */
app.get("/teams/:teamId/links", (req, res) => {
  res.send({ links });
});

// POST /teams/:teamId/links
/**
 * Request(暫定): {
 *   link: {
 *     left: Comment;
 *     right: Comment;
 *   };
 * }
 */
app.post("/teams/:teamId/links", (req, res) => {
  const { link } = req.body;
  console.log({ link });
  const newLink = { id: uniqueId(), ...link };
  links.push(newLink);
  res.send(newLink);
});

// DELETE /teams/:teamId/links/:linkId
app.delete("/teams/:teamId/links/:linkId", (req, res) => {
  const linkId = req.params.linkId;
  links = links.filter((l) => l.id !== linkId);
  res.send({ success: true });
});

// GET /techs
// Response: IGetTechAllResopnse
app.get("/techs", (req, res) => {
  res.send({ techs });
});

// PUT /techs/:techName
// Request: IPutTechBody
// 現状アイコンの変更以外には使えない
app.put("/techs/:techName", (req, res) => {
  const techName = req.params.techName;
  const {
    tech: { icon },
  } = req.body;
  techs = techs.filter((t) => (t.name === techName ? { ...t, icon } : t));
  res.send({ success: true });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
