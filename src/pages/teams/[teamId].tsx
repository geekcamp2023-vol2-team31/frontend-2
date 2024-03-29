import { useRouter } from "next/router";
import { Header } from "@/components/common/header/Header";
import { useQuery } from "@tanstack/react-query";
import { requests } from "@/utils/requests";
import IdeaPage from "@/components/teams/IdeaPage";

// TODO: バックエンドに合わせる
// 動作確認のため最低限のキーしか書いていない
interface ITeam {
  id: string;
  name: string;
  invitationCode: string;
}

// TODO: kitokenさん実装のものとマージする
/*
const IdeaPage = ({
}: {
}) => {

  const solutions = comments?.comments
    .filter((c) => c.type === "solution")
    .map((c) => {
      if (isAddingProduct) {
        return {
          ...c,
          checkboxValue: commentsSelected.some((e) => e.id === c.id),
          onChangeCheckbox,
        };
      } else {
        return c;
      }
    });
  const getProductBoundingBox = (product: IProduct) => {
    const findHeight = (commentId: string) => {
      const h = solutionHeights.find((e) => e.id === commentId);
      return h;
    };
    const comments = product.comments;
    const firstHeights = findHeight(comments[0].id);
    if (!firstHeights) {
      return undefined;
    }
    let top = firstHeights.offsetY;
    let bottom = firstHeights.height + firstHeights.offsetY;
    product.comments.forEach((comment) => {
      const heights = findHeight(comment.id);
      if (heights) {
        if (heights.offsetY < top) {
          top = heights.height;
        }
        if (heights.height + heights.offsetY > bottom) {
          bottom = heights.height + heights.offsetY;
        }
      }
    });
    const marginT = bbox?.top || 0;
    const x = bbox?.left || 0;
    const width = (bbox?.right || 0) - (bbox?.left || 0);
    return { x, width, y: marginT + top, height: bottom - top };
  };
  const products = productsData?.products.map((p) => {
    const bbox = getProductBoundingBox(p);
    return {
      ...p,
      bbox,
    };
  });
  if (!problems || !goals || !solutions || !products) {
    return null;
  }
  const handleNewProduct = () => {
    setIsAddingProduct(true);
  };
  const handleDecide = () => {
    if (commentsSelected.length === 0) {
      setIsAddingProduct(false);
      return;
    }
    void requests(`/teams/${teamId}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product: {
          name: "新しいプロダクト",
          comments: comments?.comments.filter((c) =>
            commentsSelected.some((e) => e.id === c.id)
          ),
          techs: [],
        },
      }),
    }).then(() => {
      setIsAddingProduct(false);
      setCommentsSelected([]);
      void refetchProducts();
    });
  };
  const handleAddItem = ({ id, value }: { id: string; value: string }) => {
    if (value === "") {
      return;
    }
    void requests(`/teams/${teamId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment: {
          value,
          type: id,
        },
      }),
    }).then(() => {
      void refetchComments();
    });
  };
  return (
    <div style={{ display: "flex", gap: "12px" }}>
      <IdeaList
        id="problem"
        type="problem"
        label="困り事・背景"
        leftStyle="circle"
        rightStyle="triangle"
        items={problems}
        onAddItem={handleAddItem}
      />
      <IdeaList
        id="goal"
        type="goal"
        label="どうしたいか"
        leftStyle="triangle"
        rightStyle="triangle"
        items={goals}
        onAddItem={handleAddItem}
      />
      <IdeaList
        id="solution"
        type="solution"
        label="解決策"
        leftStyle="triangle"
        rightStyle="circle"
        items={solutions}
        onAddItem={handleAddItem}
        onChangeItemsHeight={({ items }) => setSolutionHeights(items)}
        onChangeBbox={(e) => setBbox(e)}
      />
      {!isAddingProduct ? (
        <button onClick={handleNewProduct}>プロダクトを追加する</button>
      ) : (
        <button onClick={handleDecide}>決定</button>
      )}
      {products.map((product) => (
        <Fragment key={product.id}>
          {product.bbox && (
            <ProductFrame
              id={product.id}
              label={product.name}
              x={product.bbox.x}
              y={product.bbox.y}
              width={product.bbox.width}
              height={product.bbox.height}
              onClick={onProductClick}
            />
          )}
        </Fragment>
      ))}
    </div>
  );
};
*/

const Teams = () => {
  const router = useRouter();
  const teamId = router.query.teamId as string;

  const { data, isLoading } = useQuery({
    queryKey: ["teams"],
    queryFn: () => requests<{ team: ITeam }>(`/teams/${teamId}`),
    enabled: !!teamId,
  });
  if (isLoading) {
    return null;
  }
  const title = data?.team.name || "";
  return (
    <div>
      <Header
        title={title}
        invidationCode={data?.team.invitationCode}
        onHomeButtonClick={() => void router.push("/home")}
      />
      <div>
        <IdeaPage teamId={teamId} onProductClick={(e) => console.log(e)} />
      </div>
    </div>
  );
};

export default Teams;
