import { Button } from "@workspace/ui/components/button";
import { add } from "@workspace/math/add";

import { prisma } from "@workspace/database";

const Page = async () => {
  const user = await prisma.user.findFirst();

  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Hello World from web</h1>
        <Button size="sm">Button</Button>
        <p>Addtion: {add(3, 5)}</p>
        {user?.name ?? "No user added yet"}
      </div>
    </div>
  );
};

export default Page;
