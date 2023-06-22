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
app.use(cors());

const port = 4000;

const log = (msg) => {
  console.log("DEBUG @mock:", msg);
};
// ↓ ダミーデータの宣言 ↓
let techs = [{ name: "TypeScript" }, { name: "JavaScript" }, { name: "Java" }];

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

const user = {
  icon: undefined,
  id: "1",
  name: "Yamada Taro",
  bio: "Yamadaです。お願いします",
  techs: [
    { ...techs[0], level: "beginner" },
    { ...techs[1], level: "expert" },
  ],
  owns: [teams[0]],
  belongs: [teams[0], teams[1]],
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
  { id: "1", value: "コメント1", type: "problem" },
  { id: "2", value: "コメント2", type: "problem" },
  { id: "3", value: "コメント3", type: "goal" },
  { id: "4", value: "コメント4", type: "solution" },
  { id: "5", value: "コメント5", type: "solution" },
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
  { id: "1", left: comments[0], right: comments[2] },
  { id: "2", left: comments[2], right: comments[3] },
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

// GET /users/me
// Response: IGetUsersMeResponse
app.get("/users/me", (req, res) => {
  res.send({ user });
});

// PUT /users/me
// Response: IGetUsersMeResponse
app.put("/users/me", (req, res) => {
  const {
    user: { icon, name, bio, techs },
  } = req.body;
  user.icon = icon;
  user.name = name;
  user.bio = bio;
  user.techs = techs;
  res.send("success");
});

// PUT /users/me/teams/:invitationCode]
app.put("/users/me/teams/:invitationCode", (req, res) => {
  user.belongs.push(newTeam);
  res.send("successs");
});

// POST /teams
// Request: IPostTeamsBody
// Response: IPostTeamsResponse | UnauthorizedError
// ここでは常に成功する
app.post("/teams", (req, res) => {
  log({ bod: req.body });
  const {
    team: { name },
  } = req.body;
  const id = uniqueId();
  user.owns.push({ id, name });
  teams.push({ id, name });
  res.send({
    team: {
      invitationCode: "INVITATION_CODE_DUMMY",
      id,
      name,
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
  res.send("success");
});

// DELETE /teams/:teamId
app.delete("/teams/:teamId", (req, res) => {
  const teamId = req.params.teamId;
  teams = teams.filter((t) => t.id !== teamId);
  user.owns = user.owns.filter((t) => t.id !== teamId);
  user.belongs = user.belongs.filter((t) => t.id !== teamId);
  res.send("success");
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
  const {
    comment: { content, columnId },
  } = req.body;
  comments.push({ id: uniqueId, content, columnId });
  res.send("success");
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
  res.send("success");
});

// DELETE /teams/:teamId/comments/:commentId
app.delete("/teams/:teamId/comments/:commentId", (req, res) => {
  const commentId = req.params.commentId;
  comments = comments.filter((c) => c.id !== commentId);
  res.send("success");
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
  products.push({ id: uniqueId(), name, comments });
  res.send("success");
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
  res.send("success");
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
  const newLink = { id: uniqueId(), ...link };
  links.push(newLink);
  res.send(newLink);
});

// DELETE /teams/:teamId/links/:linkId
app.delete("/teams/:teamId/links/:linkId", (req, res) => {
  const linkId = req.params.linkId;
  links = links.filter((l) => l.id !== linkId);
  res.send("success");
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
  res.send("success");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
