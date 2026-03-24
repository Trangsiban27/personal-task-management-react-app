import React from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

const LoadingButton = ({ loading, children, ...props }) => {
  return (
    <Button disabled={loading} {...props}>
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {!loading && children}
    </Button>
  );
};

export default LoadingButton;
