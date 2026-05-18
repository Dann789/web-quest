import {
  CircleCheck,
  Info,
  LoaderCircle,
  OctagonX,
  TriangleAlert,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="bottom-right"
      richColors
      expand={true}
      icons={{
        success: <CircleCheck className="h-5 w-5 text-emerald-400" />,
        info: <Info className="h-5 w-5 text-blue-400" />,
        warning: <TriangleAlert className="h-5 w-5 text-amber-400" />,
        error: <OctagonX className="h-5 w-5 text-rose-400" />,
        loading: <LoaderCircle className="h-5 w-5 animate-spin text-indigo-400" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-slate-900/80 group-[.toaster]:backdrop-blur-md group-[.toaster]:text-slate-100 group-[.toaster]:border-slate-800 group-[.toaster]:shadow-2xl group-[.toaster]:rounded-xl group-[.toaster]:p-4",
          description: "group-[.toast]:text-slate-400 group-[.toast]:text-xs",
          actionButton:
            "group-[.toast]:bg-indigo-600 group-[.toast]:text-white group-[.toast]:hover:bg-indigo-700 group-[.toast]:transition-colors",
          cancelButton:
            "group-[.toast]:bg-slate-800 group-[.toast]:text-slate-400 group-[.toast]:hover:bg-slate-700",
          success: 
            "group-[.toaster]:border-emerald-500/50 group-[.toaster]:bg-emerald-950/20 group-[.toaster]:text-emerald-50",
          error: 
            "group-[.toaster]:border-rose-500/50 group-[.toaster]:bg-rose-950/20 group-[.toaster]:text-rose-50",
          info: 
            "group-[.toaster]:border-blue-500/50 group-[.toaster]:bg-blue-950/20 group-[.toaster]:text-blue-50",
          warning: 
            "group-[.toaster]:border-amber-500/50 group-[.toaster]:bg-amber-950/20 group-[.toaster]:text-amber-50",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
